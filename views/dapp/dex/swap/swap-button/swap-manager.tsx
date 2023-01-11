import { FC } from 'react';

import { SwapManagerProps } from '../swap.types';
import { findMarket } from '../swap.utils';

const SwapManager: FC<SwapManagerProps> = ({
  tokenInType,
  tokenOutType,
  poolsMap,
}) => {
  const hasNoMarket = !findMarket(poolsMap, tokenInType, tokenOutType).length;

  return (
    <div>
      {tokenInType === tokenOutType && <p>Same token error</p>}
      {hasNoMarket && <p>Token has no market</p>}
    </div>
  );
};

export default SwapManager;
