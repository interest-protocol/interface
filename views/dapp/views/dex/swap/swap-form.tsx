import { FC, useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addAllowance, getAmountsOut } from '@/api';
import { SWAP_BASES } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useDebounce, useGetSigner, useIdAccount } from '@/hooks';
import { IntMath } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { getNativeBalance } from '@/state/core/core.selectors';
import { LoadingSVG } from '@/svg';
import {
  getInterestDexRouterAddress,
  isZeroAddress,
  safeToBigNumber,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import InputBalance from '../components/input-balance';
import SwapSelectCurrency from '../components/swap-select-currency';
import { AmountCacheValue, SwapFormProps } from './swap.types';
import { handleTokenBalance, useGetDexAllowancesAndBalances } from './utils';

const AMOUNT_OUT_CACHE = new Map<string, AmountCacheValue>();

const SwapForm: FC<SwapFormProps> = ({ setValue, register, control }) => {
  const [loading, setLoading] = useState(false);
  const [isFetchingAmountOutTokenIn, setFetchingAmountOutTokenIn] =
    useState(false);
  const [isFetchingAmountOutTokenOut, setFetchingAmountOutTokenOut] =
    useState(false);

  const [hasNoMarket, setHasNoMarket] = useState(false);
  const [swapBase, setSwapBase] = useState<string | null>(null);
  const [amountOutError, setAmountOutError] = useState<null | string>(null);
  const { chainId, account } = useIdAccount();
  const { signer } = useGetSigner();
  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });
  const nativeBalance = useSelector(getNativeBalance) as string;
  const dispatch = useDispatch();

  // Handle error case
  const { balancesError, balancesData, mutate } =
    useGetDexAllowancesAndBalances(
      account,
      chainId,
      tokenIn.address,
      tokenOut.address
    );

  const parsedTokenInBalance = handleTokenBalance(
    tokenIn.address,
    balancesData.tokenInBalance,
    nativeBalance
  );

  const parsedTokenOutBalance = handleTokenBalance(
    tokenOut.address,
    balancesData.tokenOutBalance,
    nativeBalance
  );

  const debouncedTokenInValue = useDebounce(tokenIn.value, 1500);
  const debouncedTokenOutValue = useDebounce(tokenOut.value, 1500);

  const needsApproval =
    !isZeroAddress(tokenIn.address) && balancesData.tokenInAllowance.isZero();

  useEffect(() => {
    if (hasNoMarket) setHasNoMarket(false);
  }, [tokenIn.address, tokenOut.address]);

  // User is typing a value in the token in input
  // We need to disable tokenOut input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenOut) return;

    const key = `${tokenIn.address}-${tokenOut.address}-${debouncedTokenInValue}`;

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenOut.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenOut(true);

    getAmountsOut(
      chainId,
      tokenIn.address,
      tokenOut.address,
      safeToBigNumber(debouncedTokenInValue, tokenIn.decimals),
      SWAP_BASES[chainId]
    )
      .then((data) => {
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenOut.value', '0');
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          setHasNoMarket(true);
          return;
        }

        setHasNoMarket(false);
        const value = IntMath.toNumber(
          data.amountOut,
          tokenOut.decimals,
          0,
          12
        ).toString();
        setSwapBase(data.base);
        setValue('tokenOut.value', value);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setAmountOutError(`Error fetching ${tokenOut.symbol} amount`);
      })
      .finally(() => setFetchingAmountOutTokenOut(false));
  }, [
    debouncedTokenInValue,
    setValue,
    tokenIn.address,
    tokenOut.address,
    chainId,
  ]);

  // User is typing a value in the token out input
  // We need to disable tokenIn input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenIn) return;

    const key = `${tokenOut.address}-${tokenIn.address}-${debouncedTokenOutValue}`;

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenIn.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenIn(true);

    getAmountsOut(
      chainId,
      tokenOut.address,
      tokenIn.address,
      safeToBigNumber(debouncedTokenOutValue, tokenOut.decimals),
      SWAP_BASES[chainId]
    )
      .then((data) => {
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenIn.value', '0');
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          setHasNoMarket(true);
          return;
        }

        const value = IntMath.toNumber(
          data.amountOut,
          tokenIn.decimals,
          0,
          12
        ).toString();
        setSwapBase(data.base);
        setHasNoMarket(false);
        setValue('tokenIn.value', value);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setAmountOutError(`Error fetching ${tokenIn.symbol} amount`);
      })
      .finally(() => setFetchingAmountOutTokenIn(false));
  }, [
    debouncedTokenOutValue,
    setValue,
    tokenIn.address,
    tokenOut.address,
    chainId,
  ]);

  console.log(parsedTokenInBalance.toString(), 'tokenin');
  console.log(parsedTokenOutBalance.toString(), 'tokenout');

  // useEffect(() => {
  //   setValue('tokenOut.value', parsedTokenOutBalance.toString());
  // }, [parsedTokenOutBalance]);

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') => (address: string) =>
      setValue(`${name}.address`, address);

  const flipTokens = () => {
    const prevTokenOut = tokenOut;
    const prevTokenIn = tokenIn;
    setValue('tokenIn.address', prevTokenOut.address);
    setValue('tokenIn.value', prevTokenOut.value);
    setValue('tokenOut.address', prevTokenIn.address);
    setValue('tokenOut.value', '0');
  };

  const handleAddAllowance = useCallback(async () => {
    if (isZeroAddress(tokenIn.address)) return;
    setLoading(true);
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        tokenIn.address,
        getInterestDexRouterAddress(validId)
      );

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
      await mutate();
    }
  }, [account, chainId, signer, tokenIn.address]);

  const swap = async () => {};

  return (
    <Box color="text" width="100%" display="grid" gridGap="1rem" pb="L">
      <Box
        py="L"
        display="flex"
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <InputBalance
          balance={parsedTokenInBalance.toString()}
          name="tokenIn.value"
          register={register}
          setValue={setValue}
          max={IntMath.toNumber(
            parsedTokenInBalance,
            tokenIn.decimals,
            0,
            12
          ).toString()}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenIn.address}
              onSelectCurrency={onSelectCurrency('tokenIn')}
            />
          }
        />
        <Box
          mx="auto"
          my="-1.5rem"
          width="3rem"
          height="3rem"
          display="flex"
          bg="background"
          cursor="pointer"
          borderRadius="50%"
          border="1px solid"
          position="relative"
          alignItems="center"
          borderColor="accent"
          onClick={flipTokens}
          justifyContent="center"
          hover={{
            boxShadow: '0 0 0.5rem #0055FF',
          }}
        >
          ⥯
        </Box>
        <InputBalance
          balance={parsedTokenOutBalance.toString()}
          register={register}
          setValue={setValue}
          name="tokenOut.value"
          disabled={isFetchingAmountOutTokenOut}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenOut.address}
              disabled={isFetchingAmountOutTokenOut}
              onSelectCurrency={onSelectCurrency('tokenOut')}
            />
          }
        />
        {(isFetchingAmountOutTokenIn || isFetchingAmountOutTokenOut) && (
          <Box
            p="L"
            my="M"
            display="flex"
            bg="background"
            borderRadius="M"
            alignItems="center"
          >
            <Box mr="M">
              <LoadingSVG width="1rem" />
            </Box>
            <Typography variant="normal" fontSize="S">
              Fetching amount...
            </Typography>
          </Box>
        )}
        {hasNoMarket && (
          <Box
            p="L"
            my="M"
            color="error"
            display="flex"
            bg="background"
            borderRadius="M"
            alignItems="center"
          >
            <Box
              mr="M"
              width="1.2rem"
              height="1.2rem"
              display="flex"
              borderRadius="50%"
              border="1px solid"
              alignItems="center"
              justifyContent="center"
            >
              !
            </Box>
            <Typography variant="normal" fontSize="S">
              Error! Has no market
            </Typography>
          </Box>
        )}
        <WalletGuardButton>
          <Button
            mt="L"
            width="100%"
            variant="primary"
            disabled={loading}
            hover={{ bg: 'accentAlternativeActive' }}
            onClick={needsApproval ? handleAddAllowance : swap}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  {needsApproval ? 'Approving' : 'Swapping'}...
                </Typography>
              </Box>
            ) : needsApproval ? (
              'Approve'
            ) : (
              'Swapping'
            )}
          </Button>
        </WalletGuardButton>
      </Box>
    </Box>
  );
};
export default SwapForm;
