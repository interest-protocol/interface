import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { always, cond, equals, ifElse, isEmpty, T } from 'ramda';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import {
  SyntheticOracleType,
  SYNTHETICS_RESPONSE_MAP,
} from '@/constants/synthetics';
import { adjustDecimals, isSameAddress } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';
import { hasKeys } from './../../../../utils/array/index';
import {
  FindSyntheticUSDPrice,
  ISyntheticMarketSummary,
  ISyntheticMarketSummaryForm,
  ProcessSyntheticMarketSummaryData,
  SyntheticMarketSortByFilter,
  TMarketsDataAttributes,
} from './synthetics-market.types';

const MARKET_DATA_KEYS: ReadonlyArray<TMarketsDataAttributes> = [
  'LTV',
  'fee',
  'TVL',
  'syntheticUSDPrice',
  'userSyntMinted',
];

const isMissingAttribute = (
  marketData: InterestViewDinero.SyntheticMarketSummaryStructOutput[]
) =>
  !marketData.every((data) =>
    hasKeys<InterestViewDinero.SyntheticMarketSummaryStructOutput>(
      MARKET_DATA_KEYS,
      data
    )
  );

const findSyntheticUSDPrice: FindSyntheticUSDPrice = ({
  apiPrice,
  redStonePrices,
  redStonePriceIndex,
  oracleType,
}) => {
  if (oracleType === SyntheticOracleType.RedStoneConsumer)
    // RedStone price oracles always have 8 decimals
    return adjustDecimals(redStonePrices[redStonePriceIndex], 8);
  return apiPrice;
};

export const processSyntheticMarketSummaryData: ProcessSyntheticMarketSummaryData =
  (chainId, data) => {
    if (!chainId || !data) return { markets: [], loading: false };

    const responseMap = SYNTHETICS_RESPONSE_MAP[chainId];
    const [marketData, redStonePrices] = data as [
      InterestViewDinero.SyntheticMarketSummaryStructOutput[],
      BigNumber[]
    ] & {
      data: InterestViewDinero.SyntheticMarketSummaryStructOutput[];
      redStonePrices: BigNumber[];
    };

    if (
      !responseMap.length ||
      !marketData ||
      !redStonePrices ||
      !marketData.length
    )
      return { markets: [], loading: false };

    if (isMissingAttribute(marketData)) return { markets: [], loading: true };

    return {
      markets: marketData.map(
        ({ LTV, TVL, syntheticUSDPrice, userSyntMinted, fee }, index) => {
          const {
            name,
            symbol,
            oracleType,
            marketAddress,
            syntheticAddress,
            collateralAddress,
            collateralDecimals,
            redStonePriceIndex,
            dataFeedId,
          } = responseMap[index];

          return {
            LTV,
            name,
            symbol,
            chainId,
            id: index,
            oracleType,
            marketAddress,
            syntheticAddress,
            transferFee: fee,
            collateralAddress,
            dataFeedId,
            userSyntheticMinted: userSyntMinted,
            TVL: adjustDecimals(TVL, collateralDecimals),
            syntheticUSDPrice: findSyntheticUSDPrice({
              oracleType,
              redStonePrices,
              redStonePriceIndex,
              apiPrice: syntheticUSDPrice,
            }),
          };
        }
      ),
      loading: false,
    };
  };

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<ISyntheticMarketSummaryForm>,
  name: 'onlyMinted'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      logGenericEvent(`Filter_SyntheticsMarket_OnlyMinted_off`);
      setValue(name, false);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      logGenericEvent(`Filter_SyntheticsMarket_OnlyMinted_on`);
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
