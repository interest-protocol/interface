import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { v4 } from 'uuid';

import priorityHooks from '@/connectors';
import {
  BSC_TEST_ERC_20_DATA,
  FAUCET_TOKENS,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
} from '@/constants/erc-20.data';
import { Box, Button, Modal, Typography } from '@/elements';
import { CHAIN_ID, CHAINS } from '@/sdk/chains';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { TimesSVG } from '@/svg';
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
              <TimesSVG width="1rem" />
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
              <FaucetSelectCurrency onSelectCurrency={onSelectCurrency} />
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
                  <SVG width="1rem" />
                  <Typography ml="M" variant="normal">
                    {x.toSignificant(2)}
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
            variant="primary"
            bg="accentAlternative"
            hover={{ bg: 'accentAlternativeActive' }}
            onClick={async () => {
              if (!getValues || !provider || !account) return;
              const { currency, value } = getValues();

              if (!currency || !value) return;

              const tx = await MINT_MAP[currency](
                BigNumber.from(value).mul(
                  BigNumber.from(10).pow(
                    BSC_TEST_ERC_20_DATA[currency].decimals
                  )
                ),
                provider.getSigner(account)
              );

              const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

              const receipt = await tx.wait(5);
              window.alert(
                `${explorer ? explorer[0] : ''}/tx/${receipt.transactionHash}`
              );
            }}
          >
            Mint
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaucetModal;
