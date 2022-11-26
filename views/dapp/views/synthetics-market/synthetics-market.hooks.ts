import { WrapperBuilder } from '@redstone-finance/evm-connector';
import { ethers } from 'ethers';
import { useQuery } from 'wagmi';

import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { SYNTHETICS_CALL_MAP } from '@/constants/synthetics';
import GetTokenUsdPriceABI from '@/sdk/abi/get-token-usd-price.abi.json';
import { WrapperBuilder as OldWrapperBuilder } from '@/sdk/utils/red-stone-old-builder';
import { getInterestViewDineroContract, getStaticWeb3Provider } from '@/utils';
import { logException } from '@/utils/analytics';

import {
  GetTokenUsdPriceAbi,
  InterestViewDineroV2Abi,
} from '../../../../types/ethers-contracts';
import { UseGetTokenUsdPriceArgs } from './synthetics-market.types';

export const useGetSyntheticMarketsSummary = (
  account: string,
  chainId: number
) => {
  const callData = SYNTHETICS_CALL_MAP[chainId] || [];

  const contract = WrapperBuilder.wrap(
    getInterestViewDineroContract(
      chainId,
      getStaticWeb3Provider(chainId)
    ).connect(account || DEFAULT_ACCOUNT)
  ).usingDataService(
    {
      dataServiceId: callData.redStoneWrapper.dataServiceId!,
      uniqueSignersCount: callData.redStoneWrapper.uniqueSignersCount!,
      dataFeeds: callData.redStoneWrapper.dataFeeds!,
    },
    [callData.redStoneWrapper.url!]
  ) as InterestViewDineroV2Abi;

  const queryFn = () =>
    contract.getSyntheticMarketsSummary(
      account || DEFAULT_ACCOUNT,
      callData.markets,
      callData.marketTypes,
      callData.redStoneSymbols
    );

  return useQuery(
    [{ entity: 'getSyntheticMarketsSummary', chainId, account, callData }],
    queryFn,
    {
      enabled: !!callData.markets.length && !!contract.signer.call,
      onError: () =>
        logException({
          action: GAAction.ReadBlockchainData,
          label: `Transaction: getSyntheticMarketsSummary`,
          trackerName: [
            'views/dapp/views/synthetics-market/synthetics-market.hooks.ts',
          ],
        }),
    }
  );
};

export const useGetTokenUSDPrice = ({
  chainId,
  account,
  marketAddress,
  dataFeedId,
}: UseGetTokenUsdPriceArgs) => {
  const contract = OldWrapperBuilder.wrapLite(
    new ethers.Contract(
      marketAddress,
      GetTokenUsdPriceABI,
      getStaticWeb3Provider(chainId)
    ).connect(account || DEFAULT_ACCOUNT)
  ).usingPriceFeed('redstone-custom-urls-demo', {
    asset: dataFeedId,
  }) as GetTokenUsdPriceAbi;

  const queryFn = () => contract.getTokenUSDPrice();

  return useQuery(
    [
      {
        entity: 'getTokenUSDPrice',
        chainId,
        account,
        marketAddress,
        dataFeedId,
      },
    ],
    queryFn,
    {
      enabled: !!dataFeedId && !!contract.signer.call,
      onError: () =>
        logException({
          action: GAAction.ReadBlockchainData,
          label: `Transaction: getTokenUSDPrice ${marketAddress}`,
          trackerName: [
            'views/dapp/views/synthetics-market/synthetics-market.hooks.ts',
          ],
        }),
    }
  );
};
