export const LOAN_INFO = [
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
];

export const MY_POSITION = [
  {
    tip: 'Amount of Tokens Deposited as Collateral',
    name: 'Collateral deposited',
  },
  {
    tip: 'USD Value of the Collateral Deposited to<br />the loan position',
    name: 'Collateral value',
  },
  {
    tip: 'DNR Currently Borrowed in your Position <br/> + interest rate',
    name: 'DNR owed',
  },
  {
    tip: 'Collateral Price at which your Loan<br />Position will be Liquidated',
    name: 'Liquidation price',
  },
  {
    tip: 'DNR Borrowable Given the Collateral<br />Deposited',
    name: 'DNR left to borrow',
  },
  {
    tip: 'Maximum amount of collateral you can<br /> withdraw from this loan position ',
    name: 'Withdraw amount',
  },
];

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
