import { ethers } from 'ethers';
import { pathOr, prop } from 'ramda';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import { mintMAILFaucetToken } from '@/api';
import { CopyToClipboard, Tooltip } from '@/components';
import {
  DEFAULT_ERC_20_DECIMALS,
  ERC_20_DATA,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { IntMath, TOKEN_SYMBOL } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG, TimesSVG } from '@/svg';
import {
  formatMoney,
  isSameAddress,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import { FaucetFormProps, IFaucetForm } from '../faucet.types';
import CurrencyIdentifier from '../faucet-currency-identidier';
import FaucetSelectCurrency from '../faucet-select-currency';
import InputBalance from '../input-balance';

const FaucetForm: FC<FaucetFormProps> = ({
  tokens,
  isLoadingData,
  addLocalToken,
  removeLocalToken,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { chainId, account, signer } = useGetSigner();

  const { register, getValues, setValue, control } = useForm<IFaucetForm>({
    defaultValues: {
      token: tokens?.[0]?.address ?? ethers.constants.AddressZero,
      amount: 0,
    },
  });

  const onSelectCurrency = (token: string, callback?: () => void) => {
    setValue('token', token);
    setValue('amount', 0);
    callback?.();
  };

  const handleOnMint = useCallback(async () => {
    try {
      setLoading(true);

      const amount = getValues('amount');
      const token = getValues('token');

      if (!amount || isSameAddress(token, ethers.constants.AddressZero)) return;

      const { validSigner, validId } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const decimals = pathOr(
        DEFAULT_ERC_20_DECIMALS,
        [validId, ethers.utils.getAddress(token), 'decimals'],
        ERC_20_DATA
      );

      const tx = await mintMAILFaucetToken(
        validSigner,
        token,
        account,
        IntMath.toBigNumber(amount, decimals)
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [chainId, signer, account]);

  const onMint = () =>
    showToast(handleOnMint(), {
      loading: 'Minting...',
      success: 'Success!',
      error: prop('message'),
    });

  return (
    <>
      <Box
        py="XL"
        color="text"
        width="100%"
        display="grid"
        gridGap="1rem"
        height={['auto', 'auto', 'auto', '22rem']}
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <FaucetSelectCurrency
            tokens={tokens}
            label="Choose Token"
            addLocalToken={addLocalToken}
            defaultValue={getValues('token')}
            onSelectCurrency={onSelectCurrency}
          />
          <InputBalance
            name="amount"
            register={register}
            label="Type Amount"
            setValue={setValue}
            currencyPrefix={
              isLoadingData ? (
                <Skeleton width="4rem" />
              ) : (
                <CurrencyIdentifier tokens={tokens} control={control} />
              )
            }
          />
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
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          maxHeight="22rem"
          overflowY="hidden"
          flexDirection="column"
        >
          <Typography variant="normal" textTransform="uppercase" my="L">
            Your balance:
          </Typography>
          <Box
            flex="1"
            display="grid"
            overflowY="auto"
            gridGap="0.25rem"
            alignItems="start"
          >
            {isLoadingData
              ? Array.from({ length: 5 }).map(() => (
                  <Box mb="L" key={v4()}>
                    <Skeleton height="1rem" />
                  </Box>
                ))
              : tokens.map(({ symbol, address, balance }) => {
                  const SVG =
                    TOKENS_SVG_MAP[symbol] ??
                    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

                  const decimals = pathOr(
                    DEFAULT_ERC_20_DECIMALS,
                    [
                      chainId || 0,
                      ethers.utils.getAddress(address),
                      'decimals',
                    ],
                    ERC_20_DATA
                  );

                  return (
                    <Box
                      mr="M"
                      key={v4()}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        <SVG width="1rem" height="1rem" />
                        <Typography ml="M" variant="normal">
                          {formatMoney(IntMath.toNumber(balance, decimals))}
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        alignItems="center"
                        gridTemplateColumns={`4rem 2rem ${
                          addLocalToken ? '2rem' : ''
                        }`}
                      >
                        <Typography variant="normal" color="textSecondary">
                          {symbol}
                        </Typography>
                        <CopyToClipboard address={address} />
                        {removeLocalToken && (
                          <Box
                            color="error"
                            display="flex"
                            width="1.3rem"
                            height="1.3rem"
                            cursor="pointer"
                            borderRadius="S"
                            border="1px solid"
                            alignItems="center"
                            justifyContent="center"
                            hover={{
                              color: 'errorActive',
                            }}
                            onClick={() => removeLocalToken(address)}
                          >
                            <TimesSVG width="1rem" />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
          </Box>
        </Box>
      </Box>
      <Tooltip />
    </>
  );
};

export default FaucetForm;
