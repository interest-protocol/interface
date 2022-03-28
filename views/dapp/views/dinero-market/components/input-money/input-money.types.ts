import { FC, SVGAttributes } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IBorrowForm } from '../../dinero-market.types';

export interface InputMoneyProps {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  register: UseFormRegister<IBorrowForm>;
  setValue?: UseFormSetValue<IBorrowForm>;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}
