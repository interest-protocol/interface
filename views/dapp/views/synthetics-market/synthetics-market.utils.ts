import { Result } from '@ethersproject/abi';
import { isAddress } from 'ethers/lib/utils';
import { always, cond, equals, ifElse, isEmpty, T } from 'ramda';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import { SYNTHETICS_RESPONSE_MAP } from '@/constants/synthetics';
import { adjustDecimals, isSameAddress } from '@/utils';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';
import {
  ISyntheticMarketSummary,
  ISyntheticMarketSummaryForm,
  SyntheticMarketSortByFilter,
} from './synthetics-market.types';

export const processSyntheticMarketSummaryData = (
  chainId: number,
  data:
    | ([InterestViewDinero.SyntheticMarketSummaryStructOutput[]] & {
        data: InterestViewDinero.SyntheticMarketSummaryStructOutput[];
      })
    | undefined
    | Result
): ReadonlyArray<ISyntheticMarketSummary> => {
  if (!chainId || !data) return [];

  const responseMap = SYNTHETICS_RESPONSE_MAP[chainId];

  if (!responseMap.length) return [];

  return data.map((apiData, index) => {
    const responseMapData = responseMap[index];
    return {
      chainId,
      marketAddress: responseMapData.marketAddress,
      LTV: apiData.LTV,
      symbol: responseMapData.symbol,
      TVL: adjustDecimals(apiData.TVL, responseMapData.collateralDecimals),
      syntheticAddress: responseMapData.syntheticAddress,
      syntheticUSDPrice: apiData.syntheticUSDPrice,
      userSyntheticMinted: apiData.userSyntMinted,
      transferFee: apiData.fee,
      id: index,
      name: responseMapData.name,
    };
  });
};

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<ISyntheticMarketSummaryForm>,
  name: 'onlyMinted'
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

const sortByNameFn = (x: ISyntheticMarketSummary, y: ISyntheticMarketSummary) =>
  x.symbol < y.symbol ? -1 : 1;

const sortByTransferFeeFn = (
  x: ISyntheticMarketSummary,
  y: ISyntheticMarketSummary
) => (x.transferFee.lt(y.transferFee) ? 1 : -1);

const sortByPrice = (x: ISyntheticMarketSummary, y: ISyntheticMarketSummary) =>
  x.syntheticUSDPrice.lt(y.syntheticUSDPrice) ? 1 : -1;

const sortByLTV = (x: ISyntheticMarketSummary, y: ISyntheticMarketSummary) =>
  x.LTV.lt(y.LTV) ? 1 : -1;

const sortByTVLFn = (x: ISyntheticMarketSummary, y: ISyntheticMarketSummary) =>
  x.TVL.lt(y.TVL) ? 1 : -1;

const sortById = (x: ISyntheticMarketSummary, y: ISyntheticMarketSummary) =>
  x.id < y.id ? 1 : -1;

const sortByOperation = cond([
  [equals(SyntheticMarketSortByFilter.Default), always(sortById)],
  [equals(SyntheticMarketSortByFilter.LTV), always(sortByLTV)],
  [equals(SyntheticMarketSortByFilter.Price), always(sortByPrice)],
  [equals(SyntheticMarketSortByFilter.Symbol), always(sortByNameFn)],
  [
    equals(SyntheticMarketSortByFilter.TransferFee),
    always(sortByTransferFeeFn),
  ],
  [equals(SyntheticMarketSortByFilter.TVL), always(sortByTVLFn)],
  [T, always(sortById)],
]);

const searchOperation = cond([
  [isEmpty, always(T)],
  [
    T,
    (search: string) => {
      const parsedSearch = search.toLocaleLowerCase();
      return ({
        symbol,
        marketAddress,
        syntheticAddress,
        name,
      }: ISyntheticMarketSummary) => {
        if (isAddress(search))
          return (
            isSameAddress(search, syntheticAddress) ||
            isSameAddress(search, marketAddress)
          );

        return (
          name.toLocaleLowerCase().includes(parsedSearch) ||
          name.toLocaleLowerCase().includes(parsedSearch) ||
          name
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, '')) ||
          symbol.toLocaleLowerCase().includes(parsedSearch) ||
          symbol.toLocaleLowerCase().includes(parsedSearch) ||
          symbol
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, ''))
        );
      };
    },
  ],
]);

const onlyMintedOperation = ifElse<
  any[],
  (x: ISyntheticMarketSummary) => boolean,
  (x: ISyntheticMarketSummary) => boolean
>(
  equals(true),
  always(({ userSyntheticMinted }) => !userSyntheticMinted.isZero()),
  always(T)
);

export const handleFilterDineroMarkets = (
  data: ReadonlyArray<ISyntheticMarketSummary>,
  sortBy: SyntheticMarketSortByFilter,
  search: string,
  onlyMinted: boolean
) =>
  sortBy === SyntheticMarketSortByFilter.Default
    ? data.filter((x) =>
        [searchOperation(search.trim()), onlyMintedOperation(onlyMinted)].every(
          (pred) => pred(x)
        )
      )
    : data
        .slice()
        .sort(sortByOperation(sortBy))
        .filter((x) =>
          [
            searchOperation(search.trim()),
            onlyMintedOperation(onlyMinted),
          ].every((pred) => pred(x))
        );
