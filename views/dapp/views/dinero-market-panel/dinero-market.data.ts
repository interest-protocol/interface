import { DineroMarketKind } from '@/constants';

export const LOAN_INFO_MAP = {
  [DineroMarketKind.LpFreeMarket]: [
    {
      tip: 'Maximum collateral ratio - MCR represents<br />the maximum amount of debt a user<br />can borrow with a particular<br />collateral token.',
      name: 'Maximum collateral ratio',
    },
    {
      tip: 'This is the discount a liquidator gets when<br />buying collateral for liquidation',
      name: 'Liquidation fee',
    },
    {
      tip: 'This fee is added to the debt every time<br />the user borrows DNR',
      name: 'Interest',
    },
    {
      name: 'APR',
      tip: '% of your profit in USD',
    },
    {
      name: 'Pending Rewards',
      tip: 'Number of $INT tokens you have accrued',
    },
    {
      name: 'Pending rewards value',
      tip: 'Value of your rewards in USD',
    },
  ],
  [DineroMarketKind.ERC20]: [
    {
      tip: 'Maximum collateral ratio - MCR represents<br />the maximum amount of debt a user<br />can borrow with a particular<br />collateral token.',
      name: 'Maximum collateral ratio',
    },
    {
      tip: 'This is the discount a liquidator gets when<br />buying collateral for liquidation',
      name: 'Liquidation fee',
    },
    {
      tip: 'This fee is added to the debt every time<br />the user borrows DNR',
      name: 'Interest',
    },
  ],
  [DineroMarketKind.Native]: [
    {
      tip: 'Maximum collateral ratio - MCR represents<br />the maximum amount of debt a user<br />can borrow with a particular<br />collateral token.',
      name: 'Maximum collateral ratio',
    },
    {
      tip: 'This is the discount a liquidator gets when<br />buying collateral for liquidation',
      name: 'Liquidation fee',
    },
    {
      tip: 'This fee is added to the debt every time<br />the user borrows DNR',
      name: 'Interest',
    },
  ],
};

export const BORROW_DEFAULT_VALUES = {
  borrow: {
    loan: '0',
    collateral: '0',
  },
  repay: {
    collateral: '0',
    loan: '0',
  },
};
