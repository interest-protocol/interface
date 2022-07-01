import { ReactNode } from 'react';

export interface ILiquidityForm {
  pairMember1Amount: string;
  pairMember2Amount: string;
}

export interface LiquidityFormProps {
  symbols: [string, string];
  balances: [number, number];
  Icons: [ReactNode, ReactNode];
}
