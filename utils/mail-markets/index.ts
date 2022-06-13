import { ethers } from 'ethers';
import { has, map, o, prop, sort, uniq } from 'ramda';

import { MAIL_MARKET_METADATA_MAP } from '@/constants/mail-markets';
import { LocalMAILMarketData, MailMarketsSummaryData } from '@/interface';
import { MAIL_MARKET_RISKY_TOKENS_ARRAY } from '@/sdk/constants';
import { UnknownCoinSVG } from '@/svg';
import { safeGetAddress } from '@/utils';

import { ProcessManyMailSummaryData } from './mail-markets.types';

const getAddressArray = map<LocalMAILMarketData, string>(
  o(safeGetAddress, prop('token'))
);

const makeUniqTokenArray = o<
  ReadonlyArray<string>,
  ReadonlyArray<string>,
  ReadonlyArray<string>
>(
  sort((a, b) => (a > b ? 1 : -1)),
  uniq
);

export const processManyMailSummaryData: ProcessManyMailSummaryData = (
  data,
  localMailData,
  chainId
) => {
  if (!chainId || !data)
    return {
      recommendedMarkets: [],
      localMarkets: [],
    };

  const localMailDataRecord = localMailData.reduce(
    (acc, data) => ({
      ...acc,
      [safeGetAddress(data.token)]: data,
    }),
    {} as Record<string, LocalMAILMarketData>
  );

  const allSortedTokens = makeUniqTokenArray(
    MAIL_MARKET_RISKY_TOKENS_ARRAY[chainId].concat(
      getAddressArray(localMailData)
    )
  );

  return allSortedTokens.reduce(
    (acc, item, index) => {
      const x = MAIL_MARKET_METADATA_MAP[chainId][item]
        ? {
            ...MAIL_MARKET_METADATA_MAP[chainId][item],
            borrowRates: data.borrowRates[index],
            supplyRates: data.supplyRates[index],
          }
        : {
            Icon: UnknownCoinSVG,
            ...localMailDataRecord[item],
            borrowRates: data.borrowRates[index],
            supplyRates: data.supplyRates[index],
          };

      return has(item, localMailDataRecord)
        ? {
            recommendedMarkets: acc.recommendedMarkets,
            localMarkets: acc.localMarkets.concat([x]),
          }
        : {
            recommendedMarkets: acc.recommendedMarkets.concat([x]),
            localMarkets: acc.localMarkets,
          };
    },

    { recommendedMarkets: [], localMarkets: [] } as {
      recommendedMarkets: ReadonlyArray<MailMarketsSummaryData>;
      localMarkets: ReadonlyArray<MailMarketsSummaryData>;
    }
  );
};
