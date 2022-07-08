import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { getAmountsOut } from '@/api';
import { SWAP_BASES } from '@/constants';
import { useDebounce } from '@/hooks';
import { IntMath } from '@/sdk';
import { isSameAddress, isZeroAddress, safeToBigNumber } from '@/utils';

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

  // User is typing a value in the tokenOut input
  // We need to disable tokenOut input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenOut || tokenIn.setByUser || hasNoMarket) return;

    const key = `${tokenIn.address}-${tokenOut.address}-${debouncedTokenOutValue}`;

    if (!debouncedTokenOutValue || debouncedTokenOutValue == '0') return;

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
      tokenOut.address,
      tokenIn.address,
      safeToBigNumber(debouncedTokenOutValue, tokenIn.decimals),
      SWAP_BASES[chainId].filter(
        (x) =>
          !isSameAddress(x, tokenIn.address) &&
          !isSameAddress(x, tokenOut.address)
      )
    )
      .then((data) => {
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
          tokenOut.decimals,
          0,
          12
        ).toString();
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
    tokenIn.address,
    tokenOut.address,
    chainId,
    tokenIn.setByUser,
    hasNoMarket,
  ]);

  // User is typing a value in the tokenIn input
  // We need to disable tokenIn input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenIn || tokenOut.setByUser || hasNoMarket) return;

    const key = `${tokenOut.address}-${tokenIn.address}-${debouncedTokenInValue}`;

    if (!debouncedTokenInValue || debouncedTokenInValue == '0') return;

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
      tokenIn.address,
      tokenOut.address,
      safeToBigNumber(debouncedTokenInValue, tokenOut.decimals),
      []
    )
      .then((data) => {
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
          tokenIn.decimals,
          0,
          12
        ).toString();
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
    debouncedTokenInValue,
    setValue,
    tokenIn.address,
    tokenOut.address,
    chainId,
    tokenOut.setByUser,
    hasNoMarket,
  ]);

  return null;
};

export default SwapManager;
