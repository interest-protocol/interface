import { FC } from 'react';

import { TimesSVG } from '@/svg';

import { SwapManagerProps } from '../swap.types';
import { findMarket } from '../swap.utils';
import SwapMessage from './swap-message';

const SwapManager: FC<SwapManagerProps> = ({
  tokenInType,
  tokenOutType,
  poolsMap,
}) => {
  const hasNoMarket = !findMarket(poolsMap, tokenInType, tokenOutType).length;

  return (
    <>
      {tokenInType === tokenOutType && (
        <SwapMessage
          color="error"
          Icon={TimesSVG}
          message="dexSwap.swapMessage.sameOut"
        />
      )}
      {hasNoMarket && (
        <SwapMessage
          color="error"
          Icon={TimesSVG}
          message="dexSwap.swapMessage.noMarket"
        />
      )}
    </>
  );
};

export default SwapManager;
