import { prop } from 'ramda';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { getAmountsOut } from '@/api';
import { SWAP_BASES, WRAPPED_NATIVE_TOKEN } from '@/constants';
import { useDebounce } from '@/hooks';
import { CHAIN_ID, IntMath } from '@/sdk';
import {
  getWETHAddress,
  isSameAddress,
  isZeroAddress,
  safeToBigNumber,
} from '@/utils';

import { AmountCacheValue, SwapManagerProps } from './swap.types';

const AMOUNT_OUT_CACHE = new Map<string, AmountCacheValue>();

const SwapManager: FC<SwapManagerProps> = ({
  chainId,
  control,
  isFetchingAmountOutTokenOut,
  isFetchingAmountOutTokenIn,
  hasNoMarket,
  setValue,
  setFetchingAmountOutTokenOut,
  setFetchingAmountOutTokenIn,
  setHasNoMarket,
  setAmountOutError,
  setSwapBase,
}) => {
  // We want the form to re-render if addresses change
  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });

  const debouncedTokenInValue = useDebounce(tokenIn.value, 1500);
  const debouncedTokenOutValue = useDebounce(tokenOut.value, 1500);

  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId]
    ? WRAPPED_NATIVE_TOKEN[chainId]
    : WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET];

  const tokenInAddress = isZeroAddress(tokenIn.address)
    ? wrappedNativeToken.address
    : tokenIn.address;
  const tokenOutAddress = isZeroAddress(tokenOut.address)
    ? wrappedNativeToken.address
    : tokenOut.address;

  // User is typing a value in the tokenOut input
  // We need to disable tokenOut input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenOut || tokenIn.setByUser) return;

    const key = `${tokenInAddress}-${tokenOutAddress}-${debouncedTokenOutValue}`;

    if (
      !debouncedTokenOutValue ||
      +debouncedTokenOutValue === 0 ||
      isNaN(+debouncedTokenOutValue)
    )
      return;

    // If the user is swapping between NATIVE TOKEN <=> WRAPPED NATIVE TOKEN. The amounts are always the same
    if (
      (isZeroAddress(tokenIn.address) &&
        isSameAddress(getWETHAddress(chainId), tokenOut.address)) ||
      (isZeroAddress(tokenOut.address) &&
        isSameAddress(getWETHAddress(chainId), tokenIn.address))
    ) {
      setValue('tokenIn.value', debouncedTokenOutValue);
      return;
    }

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenIn.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenOut(true);

    getAmountsOut(
      chainId,
      tokenOutAddress,
      tokenInAddress,
      safeToBigNumber(debouncedTokenOutValue, tokenOut.decimals),
      SWAP_BASES[chainId]
        .concat(wrappedNativeToken)
        .filter(
          ({ address }) =>
            !isSameAddress(address, tokenInAddress) &&
            !isSameAddress(address, tokenOutAddress)
        )
        .map(prop('address'))
    )
      .then((data) => {
        setAmountOutError(null);
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenIn.value', '0');
          setHasNoMarket(true);
          setSwapBase(data.base);
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          return;
        }

        const value = IntMath.toNumber(
          data.amountOut,
          tokenIn.decimals,
          0,
          12
        ).toLocaleString('fullwide', {
          useGrouping: false,
          maximumSignificantDigits: 6,
        });
        setSwapBase(data.base);
        setValue('tokenIn.value', value);
        setHasNoMarket(false);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setHasNoMarket(true);
        setAmountOutError(`Error fetching ${tokenOut.symbol} amount`);
      })
      .finally(() => {
        setFetchingAmountOutTokenOut(false);
      });
  }, [
    debouncedTokenOutValue,
    setValue,
    tokenInAddress,
    tokenOutAddress,
    chainId,
    tokenIn.setByUser,
    hasNoMarket,
    tokenIn.address,
    tokenOut.address,
    wrappedNativeToken,
  ]);

  // User is typing a value in the tokenIn input
  // We need to disable tokenIn input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenIn || tokenOut.setByUser) return;
    const key = `${tokenOutAddress}-${tokenInAddress}-${debouncedTokenInValue}`;

    if (
      !debouncedTokenInValue ||
      +debouncedTokenInValue === 0 ||
      isNaN(+debouncedTokenInValue)
    )
      return;

    // If the user is swapping between NATIVE TOKEN <=> WRAPPED NATIVE TOKEN. The amounts are always the same
    if (
      (isZeroAddress(tokenIn.address) &&
        isSameAddress(getWETHAddress(chainId), tokenOut.address)) ||
      (isZeroAddress(tokenOut.address) &&
        isSameAddress(getWETHAddress(chainId), tokenIn.address))
    ) {
      setValue('tokenOut.value', debouncedTokenInValue);
      return;
    }

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenOut.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenIn(true);
    getAmountsOut(
      chainId,
      tokenInAddress,
      tokenOutAddress,
      safeToBigNumber(debouncedTokenInValue, tokenIn.decimals),
      SWAP_BASES[chainId]
        .concat(wrappedNativeToken)
        .filter(
          ({ address }) =>
            !isSameAddress(address, tokenInAddress) &&
            !isSameAddress(address, tokenOutAddress)
        )
        .map(prop('address'))
    )
      .then((data) => {
        setAmountOutError(null);
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenOut.value', '0');
          setHasNoMarket(true);
          setSwapBase(data.base);
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          return;
        }

        const value = IntMath.toNumber(
          data.amountOut,
          tokenOut.decimals,
          0,
          12
        ).toLocaleString('fullwide', {
          useGrouping: false,
          maximumSignificantDigits: 6,
        });
        setSwapBase(data.base);
        setHasNoMarket(false);
        setValue('tokenOut.value', value);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setHasNoMarket(true);
        setAmountOutError(`Error fetching ${tokenOut.symbol} amount`);
      })
      .finally(() => setFetchingAmountOutTokenIn(false));
  }, [
    wrappedNativeToken,
    debouncedTokenInValue,
    setValue,
    tokenInAddress,
    tokenOut.address,
    chainId,
    tokenOut.setByUser,
    hasNoMarket,
    tokenIn.address,
    tokenOutAddress,
  ]);

  return null;
};

export default SwapManager;
