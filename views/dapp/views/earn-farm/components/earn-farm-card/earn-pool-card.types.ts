import { ReactNode } from 'react';

export interface EarnPoolCardProps {
  title: string;
  amount: string;
  shadow?: boolean;
  loading: boolean;
  amountUSD: string;
  button: ReactNode;
}
