export interface DineroMarketProps {
  currency: string;
  mode: 'borrow' | 'repay';
}

export interface IBorrowForm {
  repay: {
    collateral: string;
    loan: string;
  };
  borrow: {
    collateral: string;
    loan: string;
  };
}
