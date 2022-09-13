import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { useQuoteRemoveLiquidity } from '@/hooks';
import { useDebounce } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import {
  numberToString,
  processWrappedNativeTokenAddress,
  stringToBigNumber,
} from '@/utils';

import LiquidityFormMessage from '../liquidity-form-message';
import { RemoveLiquidityManagerProps } from './remove-liquidity-card.types';

const RemoveLiquidityManager: FC<RemoveLiquidityManagerProps> = ({
  setValue,
  control,
  isStable,
  token0Address,
  token1Address,
  token0Decimals,
  token1Decimals,
  chainId,
}) => {
  const amount = useWatch({ control, name: 'lpAmount' });

  const [lastDebouncedAmount, setLastDebouncedAmount] = useState('0.0');
  const debouncedAmount = useDebounce(amount, 1500);

  const { error, data } = useQuoteRemoveLiquidity(
    processWrappedNativeTokenAddress(chainId, token0Address),
    processWrappedNativeTokenAddress(chainId, token1Address),
    isStable,
    stringToBigNumber(debouncedAmount, 18)
  );

  useEffect(() => {
    if (error) setValue('loading', false);
    if (+debouncedAmount === 0) setValue('loading', false);
    if (+debouncedAmount !== +lastDebouncedAmount) {
      setValue('loading', true);
      setLastDebouncedAmount(debouncedAmount);
    }
  }, [debouncedAmount, error]);

  useEffect(() => {
    if (data) {
      setValue(
        'token0Amount',
        numberToString(
          FixedPointMath.toNumber(data.amountA, token0Decimals, 12)
        )
      );
      setValue(
        'token1Amount',
        numberToString(
          FixedPointMath.toNumber(data.amountB, token1Decimals, 12)
        )
      );
      setValue('loading', false);
    }
  }, [data]);

  return error && +debouncedAmount != 0 ? (
    <LiquidityFormMessage message="error quoting liquidity" color="error" />
  ) : null;
};

export default RemoveLiquidityManager;
