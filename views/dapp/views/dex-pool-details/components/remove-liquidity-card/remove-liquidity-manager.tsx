import React, { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import LiquidityFormMessage from '../liquidity-form-message';
import { RemoveLiquidityManagerProps } from './remove-liquidity-card.types';

const RemoveLiquidityManager: FC<RemoveLiquidityManagerProps> = ({
  setValue,
  control,
}) => {
  const amount = useWatch({ control, name: 'lpAmount' });

  const [lastDebouncedAmount, setLastDebouncedAmount] = useState('0.0');
  const [debouncedAmount] = useDebounce(amount, 1500);

  useEffect(() => {
    if (+debouncedAmount === 0) setValue('loading', false);
    if (+debouncedAmount !== +lastDebouncedAmount) {
      setValue('loading', true);
      setLastDebouncedAmount(debouncedAmount);
    }
  }, [debouncedAmount]);

  return +debouncedAmount != 0 ? (
    <LiquidityFormMessage message="error quoting liquidity" color="error" />
  ) : null;
};

export default RemoveLiquidityManager;
