import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { AddLiquidityManagerProps } from './add-liquidity-card.types';

const AddLiquidityManager: FC<AddLiquidityManagerProps> = ({
  isFetchingQuote,
  setIsFetchingQuote,
  control,
}) => {
  const amount0 = useWatch({ name: 'token0Amount', control });
  const amount1 = useWatch({ name: 'token1Amount', control });
  const locked = useWatch({ name: 'locked', control });

  const [debouncedAmount0] = useDebounce(amount0, 1500);
  const [debouncedAmount1] = useDebounce(amount1, 1500);

  // User is typing on token0 Input, we will override both token0Amount and token1Amount
  useEffect(() => {
    if (locked || isFetchingQuote) return;

    if (!debouncedAmount0 || +debouncedAmount0 === 0) return;

    setIsFetchingQuote(true);
  }, [debouncedAmount0]);

  // User is typing on token1 Input, we will override both token0Amount and token1Amount
  useEffect(() => {
    if (locked || isFetchingQuote) return;

    if (!debouncedAmount1 || +debouncedAmount1 === 0) return;

    setIsFetchingQuote(true);
  }, [debouncedAmount1]);

  return null;
};

export default AddLiquidityManager;
