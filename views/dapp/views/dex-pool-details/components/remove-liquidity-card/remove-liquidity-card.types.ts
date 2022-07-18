import { BigNumber } from 'ethers';

import { ERC20Metadata } from '@/interface';

export interface RemoveLiquidityCardProps {
  pairAddress: string;
  token0Metadata: ERC20Metadata<BigNumber>;
  token1Metadata: ERC20Metadata<BigNumber>;
  token0: string;
  token1: string;
  isStable: boolean;
}
