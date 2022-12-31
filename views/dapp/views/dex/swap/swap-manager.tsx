import { FC, useEffect } from 'react';

import { SwapManagerProps } from './swap.types';

const SwapManager: FC<SwapManagerProps> = ({
  isFetchingAmountOutTokenOut,
  isFetchingAmountOutTokenIn,
  hasNoMarket,
  setValue,
  setFetchingAmountOutTokenOut,
  setFetchingAmountOutTokenIn,
}) => {
  // User is typing a value in the tokenOut input
  // We need to disable tokenOut input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenOut) return;

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenOut(true);
  }, [setValue, hasNoMarket]);

  // User is typing a value in the tokenIn input
  // We need to disable tokenIn input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenIn) return;

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenIn(true);
  }, [setValue, hasNoMarket]);

  return null;
};

export default SwapManager;
