export interface DineroMarketProps {
  currency: string;
  mode: 'borrow' | 'repay';
}

export interface IBorrowForm {
  repay: {
    collateral: number;
    loan: number | null;
  };
  borrow: {
    collateral: number;
    loan: number | null;
  };
}
