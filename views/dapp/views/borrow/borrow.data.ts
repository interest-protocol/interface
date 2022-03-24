import { formatDollars, formatMoney } from '@/utils';

export const borrowFees = [
  {
    tip: 'Maximum collateral ratio - MCR represents<br />the maximum amount of debt a user<br />can borrow with a particular<br />collateral token.',
    name: 'Maximum collateral ratio',
    fee: 0,
  },
  {
    tip: 'This is the discount a liquidator gets when<br />buying collateral for liquidation',
    name: 'Liquidation fee',
    fee: 0,
  },
  {
    tip: 'This fee is added to the debt every time<br />the user borrows DNR',
    name: 'Interest',
    fee: 0,
  },
];

export const myOpenPosition = [
  {
    tip: 'Amount of Tokens Deposited as Collateral',
    name: 'Collateral deposited',
    value: formatMoney(0),
  },
  {
    tip: 'USD Value of the Collateral Deposited to<br />the loan position',
    name: 'Collateral value',
    value: formatDollars(0),
  },
  {
    tip: 'DNR Currently Borrowed in your Position',
    name: 'DNR borrowed',
    value: formatDollars(0),
  },
  {
    tip: 'Collateral Price at which your Loan<br />Position will be Liquidated',
    name: 'Liquidation price',
    value: formatDollars(0),
  },
  {
    tip: 'DNR Borrowable Given the Collateral<br />Deposited',
    name: 'DNR left to borrow',
    value: formatMoney(0),
  },
  {
    tip: 'Maximum Current Amount of BTC<br />Withdrawable from this Loan Position ',
    name: 'Withdrawable amount',
    value: formatMoney(0),
  },
];
