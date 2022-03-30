import { BigNumber } from 'ethers';

import { TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { ERC20 } from '@/sdk/entities/erc-20';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

export interface GetDineroMarketUserDataReturn {
  exchangeRate: BigNumber;
  loan: [BigNumber, BigNumber, BigNumber] & {
    lastAccrued: BigNumber;
    INTEREST_RATE: BigNumber;
    feesEarned: BigNumber;
  };
  liquidationFee: BigNumber;
  ltvRatio: BigNumber;
  userCollateral: BigNumber;
  userLoan: BigNumber;
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber };
  allowance: BigNumber;
}

export type TData =
  | {
      balances: CurrencyAmount<ERC20>[];
      market: GetDineroMarketUserDataReturn;
    }
  | undefined;

export type TCurrency = TOKEN_SYMBOL;

export type TGetCurrencyAmount = (data: TData, currency: TCurrency) => number;

export type TGetRepayFields = (
  data: TData,
  currency: TCurrency
) => ReadonlyArray<IBorrowFormField> | undefined;

export type TGetBorrowFields = (
  data: TData,
  currency: TCurrency,
  collateral: string
) => ReadonlyArray<IBorrowFormField> | undefined;

export type TGetLoanData = (
  data: TData,
  loan: string
) => [string, string, string];

export type TGetInfoLoanData = (data: TData) => [string, string, string];

export type TGetMyPositionData = (
  data: TData,
  currency: TOKEN_SYMBOL
) => [string, string, string, string, string, string];
