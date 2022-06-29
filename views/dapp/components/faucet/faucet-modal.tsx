import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { mintBTC, mintDinero } from '@/api';
import { MintFaucetToken } from '@/api/faucet/faucet.types';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { userBalanceEntityActions } from '@/state/user-balances';
import { userBalanceSelectById } from '@/state/user-balances/user-balances.selectors';
import { IUserBalance } from '@/state/user-balances/user-balances.types';
import { LoadingSVG, TimesSVG } from '@/svg';
import {
  getAddressWithSymbol,
  getBTCAddress,
  getDNRAddress,
  getERC20CurrencyAmount,
  safeToBigNumber,
  showTXSuccessToast,
} from '@/utils';

import ConnectWallet from '../wallet/connect-wallet';
import { FaucetModalProps, IFaucetForm } from './faucet.types';
import FaucetSelectCurrency from './faucet-select-currency';
import InputBalance from './input-balance';

const MINT_MAP = {
  [TOKEN_SYMBOL.DNR]: mintDinero,
  [TOKEN_SYMBOL.BTC]: mintBTC,
} as {
  [key: string]: MintFaucetToken;
};

const getTestNetAddressWithSymbol = getAddressWithSymbol(CHAIN_ID.BNB_TEST_NET);

const FaucetModal: FC<FaucetModalProps> = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { chainId, account } = useIdAccount();
  const { signer } = useGetSigner();

  const { register, getValues, setValue } = useForm<IFaucetForm>({
    defaultValues: {
      currency: TOKEN_SYMBOL.BTC,
      value: '0',
    },
  });

  const onSelectCurrency = (currency: TOKEN_SYMBOL) => {
    setValue('currency', currency);
    setValue('value', '0');
  };

  const btcEntity = useSelector(
    userBalanceSelectById(getBTCAddress(CHAIN_ID.BNB_TEST_NET))
  ) as IUserBalance | undefined;

  const dnrEntity = useSelector(
    userBalanceSelectById(getDNRAddress(CHAIN_ID.BNB_TEST_NET))
  ) as IUserBalance | undefined;

  const data = useMemo(() => {
    if (!btcEntity?.id || !dnrEntity?.id) return [];

    return [
      getERC20CurrencyAmount(
        CHAIN_ID.BNB_TEST_NET,
        btcEntity.id,
        btcEntity.balance
      ),
      getERC20CurrencyAmount(
        CHAIN_ID.BNB_TEST_NET,
        dnrEntity.id,
        dnrEntity.balance
      ),
    ];
  }, [btcEntity, dnrEntity]);

  const onMint = useCallback(async () => {
    if (!signer) return;

    const { currency, value } = getValues();

    if (!currency.length || !Number(value) || !chainId) return;

    setLoading(true);

    const parsedValue = safeToBigNumber(value);

    try {
      const tx = await MINT_MAP[currency](signer, parsedValue);

      await showTXSuccessToast(tx, chainId);

      dispatch(
        userBalanceEntityActions.addUserBalance({
          id: getTestNetAddressWithSymbol(currency),
          balance: parsedValue.toString(),
        })
      );
    } catch (e) {
      throw e ?? new Error('Something went wrong');
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [signer, getValues().value, getValues().currency]);

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
          {data.map((x) => {
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
        <Box display="flex" justifyContent="center">
          {account ? (
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
          ) : (
            <ConnectWallet />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default FaucetModal;
