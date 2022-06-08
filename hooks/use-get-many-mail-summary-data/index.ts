import { ethers } from 'ethers';
import { compose, map, sort, uniq } from 'ramda';
import { useSelector } from 'react-redux';

import { getManyMAILSummaryData } from '@/api';
import { supportsMAILMarkets } from '@/constants';
import {
  MAIL_MARKET_BRIDGE_TOKENS,
  MAIL_MARKET_RISKY_TOKENS_ARRAY,
} from '@/sdk/constants';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';
import useSupportedChain from '../use-supported-chain';

const makeUniqueRiskyAssets = compose<
  any[],
  ReadonlyArray<string>,
  ReadonlyArray<string>,
  ReadonlyArray<string>
>(
  uniq,
  sort((a, b) => (a > b ? 1 : -1)),
  map(ethers.utils.getAddress)
);

export const useGetManyMailSummaryData = (
  additionalRiskyTokens: ReadonlyArray<string> = []
) => {
  const chainId = useSupportedChain(useSelector(getChainId) as number | null);

  const tokens =
    chainId && supportsMAILMarkets(chainId)
      ? MAIL_MARKET_BRIDGE_TOKENS[chainId]
      : [];

  const riskyAssets =
    chainId && supportsMAILMarkets(chainId)
      ? MAIL_MARKET_RISKY_TOKENS_ARRAY[chainId].concat(additionalRiskyTokens)
      : [];

  return useCallContract(
    chainId,
    getManyMAILSummaryData,
    [chainId, tokens, makeUniqueRiskyAssets(riskyAssets)],
    {
      revalidateOnFocus: false,
      refreshWhenHidden: false,
    }
  );
};
