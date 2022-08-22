import {
  DINERO_MARKET_CALL_MAP,
  DINERO_MARKET_METADATA,
} from '@/constants/dinero-markets';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';
import { DineroMarketSummary } from './dinero-market.types';

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
