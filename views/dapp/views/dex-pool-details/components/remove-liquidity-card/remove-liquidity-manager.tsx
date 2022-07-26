import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { useQuoteRemoveLiquidity } from '@/hooks';
import { useDebounce } from '@/hooks';
import { IntMath } from '@/sdk';
import { processWrappedNativeTokenAddress, stringToBigNumber } from '@/utils';

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

  const debouncedAmount = useDebounce(amount, 1500);

  const { error, data } = useQuoteRemoveLiquidity(
    processWrappedNativeTokenAddress(chainId, token0Address),
    processWrappedNativeTokenAddress(chainId, token1Address),
    isStable,
    stringToBigNumber(debouncedAmount, 18)
  );

  useEffect(() => {
    if (data) {
      setValue(
        'token0Amount',
        IntMath.toNumber(data.amountA, token0Decimals, 12).toLocaleString(
          'fullwide',
          {
            useGrouping: false,
            maximumSignificantDigits: 6,
          }
        )
      );
      setValue(
        'token1Amount',
        IntMath.toNumber(data.amountB, token1Decimals, 12).toLocaleString(
          'fullwide',
          {
            useGrouping: false,
            maximumSignificantDigits: 6,
          }
        )
      );
    }
  }, [data]);

  return error && +debouncedAmount != 0 ? (
    <div>error quoting liquidity</div>
  ) : null;
};

export default RemoveLiquidityManager;
