import { ethers } from 'ethers';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { quoteAddLiquidity } from '@/api';
import { WRAPPED_NATIVE_TOKEN } from '@/constants';
import { useDebounce } from '@/hooks';
import { FixedPointMath, ZERO_ADDRESS } from '@/sdk';
import {
  isSameAddressZ,
  processWrappedNativeTokenAddress,
  stringToBigNumber,
} from '@/utils';

import { AddLiquidityManagerProps } from './add-liquidity-card.types';

const processDecimals = (chainId: number, token: string, decimals: number) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];

  return isSameAddressZ(token, ZERO_ADDRESS)
    ? wrappedNativeToken.decimals
    : decimals;
};

const AddLiquidityManager: FC<AddLiquidityManagerProps> = ({
  chainId,
  isFetchingQuote,
  setIsFetchingQuote,
  setValue,
  control,
  tokens,
  isStable,
}) => {
  const amount0 = useWatch({ name: 'token0Amount', control });
  const amount1 = useWatch({ name: 'token1Amount', control });
  const locked = useWatch({ name: 'locked', control });

  const debouncedAmount0 = useDebounce(amount0, 1500);
  const debouncedAmount1 = useDebounce(amount1, 1500);

  // User is typing on token0 Input, we will override both token0Amount and token1Amount
  useEffect(() => {
    if (locked || isFetchingQuote) return;

    if (!debouncedAmount0 || +debouncedAmount0 === 0) return;

    setIsFetchingQuote(true);
    quoteAddLiquidity(
      chainId,
      processWrappedNativeTokenAddress(chainId, tokens[0].address),
      processWrappedNativeTokenAddress(chainId, tokens[1].address),
      isStable,
      stringToBigNumber(debouncedAmount0, tokens[0].decimals),
      ethers.constants.MaxUint256
    )
      .then(({ amountA, amountB }) => {
        // clear error
        setValue('error', '');
        setValue('locked', true);
        setValue(
          'token0Amount',
          FixedPointMath.toNumber(
            amountA,
            processDecimals(chainId, tokens[0].address, tokens[0].decimals),
            0,
            12
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 6,
          })
        );
        setValue(
          'token1Amount',
          FixedPointMath.toNumber(
            amountB,
            processDecimals(chainId, tokens[1].address, tokens[1].decimals),
            0,
            12
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 6,
          })
        );
      })
      .catch(() => setValue('error', 'Failed to find quote'))
      .finally(() => setIsFetchingQuote(false));
  }, [debouncedAmount0, chainId]);

  // User is typing on token1 Input, we will override both token0Amount and token1Amount
  useEffect(() => {
    if (locked || isFetchingQuote) return;

    if (!debouncedAmount1 || +debouncedAmount1 === 0) return;

    setIsFetchingQuote(true);

    quoteAddLiquidity(
      chainId,
      processWrappedNativeTokenAddress(chainId, tokens[1].address),
      processWrappedNativeTokenAddress(chainId, tokens[0].address),
      isStable,
      stringToBigNumber(
        debouncedAmount1,
        processDecimals(chainId, tokens[1].address, tokens[1].decimals)
      ),
      ethers.constants.MaxUint256
    )
      .then(({ amountA, amountB }) => {
        // clear error
        setValue('error', '');
        setValue('locked', true);
        setValue(
          'token0Amount',
          FixedPointMath.toNumber(
            amountB,
            tokens[1].decimals,
            0,
            12
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 6,
          })
        );
        setValue(
          'token1Amount',
          FixedPointMath.toNumber(
            amountA,
            tokens[0].decimals,
            0,
            12
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 6,
          })
        );
      })
      .catch(() => setValue('error', 'Failed to find quote'))
      .finally(() => setIsFetchingQuote(false));
  }, [debouncedAmount1, chainId]);

  return null;
};

export default AddLiquidityManager;
