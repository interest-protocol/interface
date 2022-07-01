import { ReactNode } from 'react';

export interface IClaimForm {
  pairMember1Amount: string;
  pairMember2Amount: string;
}

export interface ClaimFormProps {
  symbols: [string, string];
  balances: [number, number];
  Icons: [ReactNode, ReactNode];
}
