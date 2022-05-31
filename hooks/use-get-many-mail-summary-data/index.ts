import { useSelector } from 'react-redux';

import { getManyMAILSummaryData } from '@/api';
import { supportsMAILMarkets } from '@/constants';
import {
  MAIL_MARKET_BRIDGE_TOKENS,
  MAIL_MARKET_RISKY_TOKENS_ARRAY,
} from '@/sdk/constants';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetManyMailSummaryData = (
  additionalRiskyTokens: ReadonlyArray<string> = []
) => {
  const chainId = useSelector(getChainId) as number | null;

  const tokens =
    chainId && supportsMAILMarkets(chainId)
      ? MAIL_MARKET_BRIDGE_TOKENS[chainId]
      : [];

  const riskyAssets =
    chainId && supportsMAILMarkets(chainId)
      ? MAIL_MARKET_RISKY_TOKENS_ARRAY[chainId].concat(additionalRiskyTokens)
      : [];
  console.log(tokens, 'tokens');
  console.log(riskyAssets, 'risky assets');
  return useCallContract(chainId, getManyMAILSummaryData, [
    chainId,
    tokens,
    riskyAssets,
  ]);
};
