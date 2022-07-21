import { BigNumber } from 'ethers';
import { ReactNode } from 'react';

export interface IAddLiquidityForm {
  tokenInAmount: string;
  tokenOutAmount: string;
}

export interface IToken {
  symbol: string;
  Icon: ReactNode;
}

export interface AddLiquidityCardProps {
  isStable: boolean;
  pairAddress: string;
  tokens: [IToken, IToken];
  balances: [number, number];
  lpBalance: {
    allowance: BigNumber;
    balance: BigNumber;
  };
  addresses: [string, string];
}
