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

export type MarketAndBalancesData = {
  balances: [CurrencyAmount<ERC20>, CurrencyAmount<ERC20>];
  market: GetDineroMarketUserDataReturn;
};

export type TCurrency = TOKEN_SYMBOL;

export type TGetRepayFields = (
  data: MarketAndBalancesData,
  currency: TCurrency
) => ReadonlyArray<IBorrowFormField>;

export type TGetBorrowFields = (
  data: MarketAndBalancesData,
  currency: TCurrency,
  collateral: string
) => ReadonlyArray<IBorrowFormField>;

export type TGetLoanData = (
  data: MarketAndBalancesData,
  loan: string
) => [string, string, string];

export type TGetInfoLoanData = (
  data: MarketAndBalancesData
) => [string, string, string];

export type TGetMyPositionData = (
  data: MarketAndBalancesData,
  currency: TOKEN_SYMBOL
) => [string, string, string, string, string, string];
