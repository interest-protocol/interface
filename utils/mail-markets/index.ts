import { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { compose, equals, o, prop, take } from 'ramda';

import { MAIL_MARKET_METADATA_MAP } from '@/constants/mail-markets';
import { MAIL_MARKET_RISKY_TOKENS_ARRAY } from '@/sdk/constants';
import { UnknownCoinSVG } from '@/svg';

import { ProcessManyMailSummaryData } from './mail-markets.types';

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

  const recommendedLength = MAIL_MARKET_RISKY_TOKENS_ARRAY[chainId].length;

  const recommendedBorrowRates = take<Array<BigNumber>>(
    recommendedLength,
    data.borrowRates
  );
  const recommendedSupplyRates = take<Array<BigNumber>>(
    recommendedLength,
    data.supplyRates
  );

  const localBorrowRates = data.borrowRates.slice(recommendedLength);
  const localSupplyRates = data.borrowRates.slice(recommendedLength);

  const recommendedMarkets = MAIL_MARKET_RISKY_TOKENS_ARRAY[chainId].map(
    (address, index) => ({
      ...MAIL_MARKET_METADATA_MAP[chainId][address],
      borrowRates: recommendedBorrowRates[index],
      supplyRates: recommendedSupplyRates[index],
    })
  );

  const localMarkets = localMailData.map(
    ({ market, symbol, name, token }, index) => ({
      Icon: UnknownCoinSVG,
      symbol,
      name,
      market,
      borrowRates: localBorrowRates[index],
      supplyRates: localSupplyRates[index],
      token,
    })
  );

  const localAddresses = localMailData.map(
    o(ethers.utils.getAddress, prop('market'))
  );

  return {
    recommendedMarkets: recommendedMarkets
      // Remove addresses that are already locally saved
      .filter(
        ({ market }) =>
          !localAddresses.includes(ethers.utils.getAddress(market))
      ),
    // If a recommended market is locally saved use our metadata
    localMarkets: localMarkets.map((element) => {
      const mailMarket = recommendedMarkets.find(
        compose(
          equals(ethers.utils.getAddress(element.market)),
          ethers.utils.getAddress,
          prop('market')
        )
      );
      return mailMarket ? mailMarket : element;
    }),
  };
};
