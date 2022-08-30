import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { always, cond, equals, ifElse, isEmpty, T } from 'ramda';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import {
  DINERO_MARKET_METADATA,
  DINERO_MARKET_SUMMARY_CALL_MAP,
} from '@/constants/dinero-markets';
import { TOKEN_SYMBOL } from '@/sdk';
import { isSameAddress } from '@/utils';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';
import { BorrowSortByFilter } from './components/borrow-filters/borrow-filters.types';
import { DineroMarketSummary, IDineroMarketForm } from './dinero-market.types';

export const getSafeDineroMarketSummaryData = (
  chainId: number,
  data:
    | ([
        InterestViewDinero.DineroMarketSummaryStructOutput,
        InterestViewDinero.DineroMarketSummaryStructOutput[],
        InterestViewDinero.DineroMarketSummaryStructOutput[]
      ] & {
        nativeMarket: InterestViewDinero.DineroMarketSummaryStructOutput;
        erc20Markets: InterestViewDinero.DineroMarketSummaryStructOutput[];
        lpMarkets: InterestViewDinero.DineroMarketSummaryStructOutput[];
      })
    | undefined
): ReadonlyArray<DineroMarketSummary> => {
  if (!chainId || !data) return [];

  const callMap = DINERO_MARKET_SUMMARY_CALL_MAP[chainId];

  if (!callMap) return [];

  const nativeMarket = {
    totalCollateral: data.nativeMarket.totalCollateral,
    LTV: data.nativeMarket.LTV,
    interestRate: data.nativeMarket.interestRate,
    liquidationFee: data.nativeMarket.liquidationFee,
    collateralUSDPrice: data.nativeMarket.collateralUSDPrice,
    userElasticLoan: data.nativeMarket.userElasticLoan,
    marketAddress: callMap.nativeMarket,
    ...DINERO_MARKET_METADATA[chainId][callMap.nativeMarket],
  };

  const erc20Markets = callMap.erc20Markets.map((market, index) => ({
    totalCollateral: data.erc20Markets[index].totalCollateral,
    LTV: data.erc20Markets[index].LTV,
    interestRate: data.erc20Markets[index].interestRate,
    liquidationFee: data.erc20Markets[index].liquidationFee,
    collateralUSDPrice: data.erc20Markets[index].collateralUSDPrice,
    userElasticLoan: data.erc20Markets[index].userElasticLoan,
    marketAddress: market,
    ...DINERO_MARKET_METADATA[chainId][market],
  }));

  const lpFreeMarkets = callMap.lpFreeMarkets.map((market, index) => ({
    totalCollateral: data.lpMarkets[index].totalCollateral,
    LTV: data.lpMarkets[index].LTV,
    interestRate: data.lpMarkets[index].interestRate,
    liquidationFee: data.lpMarkets[index].liquidationFee,
    collateralUSDPrice: data.lpMarkets[index].collateralUSDPrice,
    userElasticLoan: data.lpMarkets[index].userElasticLoan,
    marketAddress: market,
    ...DINERO_MARKET_METADATA[chainId][market],
  }));

  return [nativeMarket].concat(erc20Markets).concat(lpFreeMarkets);
};

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IDineroMarketForm>,
  name: 'onlyBorrowing'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      setValue(name, false);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      setValue(name, true);
    },
  },
];

const sortByNameFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.name < y.name ? -1 : 1;

const sortByInterestRateFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.interestRate.lt(y.interestRate) ? 1 : -1;

const sortFeeByFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.liquidationFee.lt(y.liquidationFee) ? 1 : -1;

const sortByTVLFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.totalCollateral
    .mul(x.collateralUSDPrice)
    .div(BigNumber.from(10).pow(x.collateralDecimals))
    .lt(
      y.totalCollateral
        .mul(y.collateralUSDPrice)
        .div(BigNumber.from(10).pow(y.collateralDecimals))
    )
    ? 1
    : -1;

const sortByLTVFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.LTV.lt(y.LTV) ? 1 : -1;

const sortByOperation = cond([
  [equals(BorrowSortByFilter.Default), always(sortByNameFn)],
  [equals(BorrowSortByFilter.InterestRate), always(sortByInterestRateFn)],
  [equals(BorrowSortByFilter.Fee), always(sortFeeByFn)],
  [equals(BorrowSortByFilter.TVL), always(sortByTVLFn)],
  [equals(BorrowSortByFilter.LTV), always(sortByLTVFn)],
  [T, always(sortByNameFn)],
]);

const searchOperation = cond([
  [isEmpty, always(T)],
  [
    T,
    (search: string) => {
      const parsedSearch = search.toLocaleLowerCase();
      return ({
        collateralAddress,
        marketAddress,
        name,
        symbol0,
        symbol1,
      }: DineroMarketSummary) => {
        if (isAddress(search))
          return (
            isSameAddress(search, collateralAddress) ||
            isSameAddress(search, marketAddress)
          );

        const symbols = [
          symbol0.toLocaleLowerCase(),
          symbol1.toLocaleLowerCase(),
        ].filter((x) => x !== TOKEN_SYMBOL.Unknown.toLocaleLowerCase());

        return (
          collateralAddress.toLocaleLowerCase().includes(parsedSearch) ||
          marketAddress.toLocaleLowerCase().includes(parsedSearch) ||
          name.toLocaleLowerCase().includes(parsedSearch) ||
          name.toLocaleLowerCase().includes(parsedSearch) ||
          name
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, '')) ||
          symbols.some((x) => x.startsWith(parsedSearch))
        );
      };
    },
  ],
]);

const onlyBorrowingOperation = ifElse<
  any[],
  (x: DineroMarketSummary) => boolean,
  (x: DineroMarketSummary) => boolean
>(
  equals(true),
  always(({ userElasticLoan }) => !userElasticLoan.isZero()),
  always(T)
);

export const handleFilterDineroMarkets = (
  data: ReadonlyArray<DineroMarketSummary>,
  sortBy: BorrowSortByFilter,
  search: string,
  onlyBorrowing: boolean
) =>
  sortBy === BorrowSortByFilter.Default
    ? data.filter((x) =>
        [
          searchOperation(search.trim()),
          onlyBorrowingOperation(onlyBorrowing),
        ].every((pred) => pred(x))
      )
    : data
        .slice()
        .sort(sortByOperation(sortBy))
        .filter((x) =>
          [
            searchOperation(search.trim()),
            onlyBorrowingOperation(onlyBorrowing),
          ].every((pred) => pred(x))
        );
