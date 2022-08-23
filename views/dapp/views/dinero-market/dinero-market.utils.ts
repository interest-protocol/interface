import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { always, cond, equals, ifElse, isEmpty, pathOr, T } from 'ramda';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import { ERC_20_DATA, UNKNOWN_ERC_20 } from '@/constants';
import {
  DINERO_MARKET_CALL_MAP,
  DINERO_MARKET_METADATA,
} from '@/constants/dinero-markets';
import { IntMath } from '@/sdk';
import {
  isSameAddress,
  replaceWrappedNativeTokenWithNativeTokenSymbol,
} from '@/utils';

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
  const callMap = DINERO_MARKET_CALL_MAP[chainId];
  if (!chainId || !data || !callMap) return [];

  const nativeMarket = {
    collateralAmount: data.nativeMarket.collateralAmount,
    LTV: data.nativeMarket.LTV,
    interestRate: data.nativeMarket.interestRate,
    liquidationFee: data.nativeMarket.liquidationFee,
    collateralUSDPrice: data.nativeMarket.collateralUSDPrice,
    userElasticLoan: data.nativeMarket.userElasticLoan,
    marketAddress: callMap.nativeMarket,
    ...DINERO_MARKET_METADATA[chainId][callMap.nativeMarket],
  };

  const erc20Markets = callMap.erc20Markets.map((market, index) => ({
    collateralAmount: data.erc20Markets[index].collateralAmount,
    LTV: data.erc20Markets[index].LTV,
    interestRate: data.erc20Markets[index].interestRate,
    liquidationFee: data.erc20Markets[index].liquidationFee,
    collateralUSDPrice: data.erc20Markets[index].collateralUSDPrice,
    userElasticLoan: data.erc20Markets[index].userElasticLoan,
    marketAddress: market,
    ...DINERO_MARKET_METADATA[chainId][market],
  }));

  const lpFreeMarkets = callMap.lpFreeMarkets.map((market, index) => ({
    collateralAmount: data.lpMarkets[index].collateralAmount,
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

const sortByIdFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.name < y.name ? -1 : 1;

const sortByAPRFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.interestRate.lt(y.interestRate) ? 1 : -1;

const sortFeeByFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  x.liquidationFee.lt(y.liquidationFee) ? 1 : -1;

const sortByTVLFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  IntMath.from(
    x.collateralAmount
      .mul(x.collateralUSDPrice)
      .div(BigNumber.from(10).pow(x.collateralDecimals))
  ).toNumber() <
  IntMath.from(
    y.collateralAmount
      .mul(y.collateralUSDPrice)
      .div(BigNumber.from(10).pow(y.collateralDecimals))
  ).toNumber()
    ? 1
    : -1;

const sortByLTVFn = (x: DineroMarketSummary, y: DineroMarketSummary) =>
  IntMath.from(x.LTV).toPercentage(0) < IntMath.from(y.LTV).toPercentage(0)
    ? 1
    : -1;

const sortByOperation = cond([
  [equals(BorrowSortByFilter.Default), always(sortByIdFn)],
  [equals(BorrowSortByFilter.APR), always(sortByAPRFn)],
  [equals(BorrowSortByFilter.Fee), always(sortFeeByFn)],
  [equals(BorrowSortByFilter.TVL), always(sortByTVLFn)],
  [equals(BorrowSortByFilter.LTV), always(sortByLTVFn)],
  [T, always(sortByIdFn)],
]);

const searchOperation = cond([
  [isEmpty, always(T)],
  [
    T,
    (search: string) => {
      const parsedSearch = search.toLocaleLowerCase();
      return ({ chainId, token0, token1 }: DineroMarketSummary) => {
        const erc0 = pathOr(
          UNKNOWN_ERC_20,
          [chainId.toString(), token0],
          ERC_20_DATA
        );
        const erc1 = pathOr(
          UNKNOWN_ERC_20,
          [chainId.toString(), token1],
          ERC_20_DATA
        );

        if (isAddress(search))
          return isSameAddress(search, token0) || isSameAddress(search, token1);

        const farmName = `${replaceWrappedNativeTokenWithNativeTokenSymbol(
          erc0.symbol
        )}-${replaceWrappedNativeTokenWithNativeTokenSymbol(erc1.symbol)}`;

        return (
          token1.toLocaleLowerCase().includes(parsedSearch) ||
          token0.toLocaleLowerCase().includes(parsedSearch) ||
          erc0.name.toLocaleLowerCase().includes(parsedSearch) ||
          erc1.name.toLocaleLowerCase().includes(parsedSearch) ||
          erc0.symbol.toLocaleLowerCase().includes(parsedSearch) ||
          erc1.symbol.toLocaleLowerCase().includes(parsedSearch) ||
          farmName.toLocaleLowerCase().includes(parsedSearch) ||
          farmName
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, ''))
        );
      };
    },
  ],
]);

// TODO: check these fns
const onlyBorrowingOperation = ifElse<
  any[],
  (x: DineroMarketSummary) => boolean,
  (x: DineroMarketSummary) => boolean
>(
  equals(true),
  always(({ collateralAmount }) => !collateralAmount.isZero()),
  always(({ collateralAmount }) => collateralAmount.isZero())
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
