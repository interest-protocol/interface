import { BigNumber } from 'ethers';

import { ERC20Metadata } from '@/interface';

import { IToken } from '../add-liquidity-card/liquidity-form.types';

export interface RemoveLiquidityCardProps {
  isStable: boolean;
  pairAddress: string;
  tokens: [IToken, IToken];
  addresses: [string, string];
  token0Metadata: ERC20Metadata<BigNumber>;
  token1Metadata: ERC20Metadata<BigNumber>;
  lpBalance: {
    allowance: BigNumber;
    balance: BigNumber;
  };
}

export interface IRemoveLiquidityForm {
  lpAmount: string;
}
