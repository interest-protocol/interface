import { propEq } from 'ramda';
import { UseFormReturn } from 'react-hook-form';

import { DINERO_MARKET_CONTRACTS, IMarketContractsChainData } from '@/sdk';
import { IBorrowForm } from '@/views/dapp/views/dinero-market-panel/dinero-market.types';

export const isFormBorrowEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.borrow ||
  form.formState.errors.borrow?.['loan'] ||
  form.formState.errors.borrow?.['collateral'];

export const isFormRepayEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.repay ||
  form.formState.errors.repay?.['loan'] ||
  form.formState.errors.repay?.['collateral'];

// TODO: get from blockchain or contract response
export const isPairInterestDineroMarketPair = (
  address: string,
  chainId: number
): boolean =>
  (
    DINERO_MARKET_CONTRACTS[chainId].find(
      propEq('marketAddress', address)
    ) as IMarketContractsChainData
  )?.collateralSymbols.length > 1;
