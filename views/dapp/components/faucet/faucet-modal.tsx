import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { v4 } from 'uuid';

import priorityHooks from '@/connectors';
import { CHAIN_ID, CHAINS } from '@/constants/chains';
import {
  BSC_TEST_ERC_20_DATA,
  FAUCET_TOKENS,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
} from '@/constants/erc-20.data';
import { Box, Button, Modal, Typography } from '@/elements';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { LoadingSVG, TimesSVG } from '@/svg';
import { mintBTC, mintDinero } from '@/utils/erc-20';
import { getERC20Balance } from '@/utils/erc-20';

import { FaucetModalProps, IFaucetForm } from './faucet.types';
import FaucetSelectCurrency from './faucet-select-currency';
import InputBalance from './input-balance';

const { usePriorityAccount, usePriorityProvider } = priorityHooks;

const MINT_MAP = {
  [TOKEN_SYMBOL.DNR]: mintDinero,
  [TOKEN_SYMBOL.BTC]: mintBTC,
} as {
  [key: string]: (
    amount: BigNumber,
    signer: JsonRpcSigner
  ) => Promise<ContractTransaction>;
};

const FaucetModal: FC<FaucetModalProps> = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { register, getValues, setValue } = useForm<IFaucetForm>({
    defaultValues: {
      currency: TOKEN_SYMBOL.BTC,
      value: 0,
    },
  });

  const onSelectCurrency = (currency: TOKEN_SYMBOL) => {
    setValue('currency', currency);
    setValue('value', 0);
  };

  const account = usePriorityAccount();
  const provider = usePriorityProvider();

  const { data } = useSWR(`${account}-erc20-balances`, async () => {
    if (!account || !provider) return Promise.reject();

    const balances = await Promise.all(
      FAUCET_TOKENS.map(({ address }) =>
        getERC20Balance(account, address, provider)
      )
    );

    return balances.map((x, i) =>
      CurrencyAmount.fromRawAmount(
        BSC_TEST_ERC_20_DATA[FAUCET_TOKENS[i].symbol],
        x
      )
    );
  });

  const handleMint = async () => {
    setLoading(true);
    try {
      if (!getValues || !provider || !account) return;

      const { currency, value } = getValues();

      if (!currency || !value) return;

      const tx = await MINT_MAP[currency](
        BigNumber.from(value).mul(
          BigNumber.from(10).pow(BSC_TEST_ERC_20_DATA[currency].decimals)
        ),
        provider.getSigner(account)
      );

      const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

      const receipt = await tx.wait(5);
      toast(
        <a
          target="__black"
          rel="noreferrer nofollow"
          href={`${explorer ? explorer[0] : ''}/tx/${receipt.transactionHash}`}
        >
          Check on Explorer
        </a>
      );
    } catch (e) {
      throw e ?? new Error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onMint = () =>
    toast.promise(handleMint(), {
      loading: 'Loading...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  return (
    <Modal
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        onRequestClose: handleClose,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
      <Box
        py="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="22rem"
        maxWidth="26rem"
        borderRadius="M"
        px={['L', 'XL']}
      >
        <Box display="flex" justifyContent="flex-end">
          <Box
            mt="-4.5rem"
            mr="-1em"
            display="flex"
            textAlign="right"
            position="absolute"
            justifyContent="flex-end"
          >
            <Button
              px="L"
              variant="primary"
              onClick={handleClose}
              hover={{
                bg: 'accentActive',
              }}
            >
              <TimesSVG width="1rem" height="1rem" />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="title3" fontWeight="normal">
            FAUCET
          </Typography>
          <Typography variant="normal" color="textSecondary" mt="S">
            Get test tokens
          </Typography>
        </Box>
        <Box my="XL">
          <InputBalance
            name="value"
            register={register}
            label="Choose token"
            getValues={getValues}
            currencyPrefix={
              <FaucetSelectCurrency
                defaultValue={getValues('currency')}
                onSelectCurrency={onSelectCurrency}
              />
            }
            setValue={setValue}
          />
        </Box>
        <Box my="XXL">
          <Typography variant="normal" textTransform="uppercase" mt="L">
            Your balance:
          </Typography>
          {data?.map((x) => {
            const SVG = TOKENS_SVG_MAP[x.currency.symbol];

            return (
              <Box
                key={v4()}
                display="flex"
                justifyContent="space-between"
                my="L"
              >
                <Box display="flex">
                  <SVG width="1rem" height="1rem" />
                  <Typography ml="M" variant="normal">
                    {x.toSignificant(4)}
                  </Typography>
                </Box>
                <Typography variant="normal" color="textSecondary">
                  {x.currency.symbol}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box display="flex">
          <Button
            width="100%"
            onClick={onMint}
            variant="primary"
            disabled={loading}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  Minting...
                </Typography>
              </Box>
            ) : (
              'Mint'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaucetModal;
