import { compose, filter, map, not, o, sort, uniq } from 'ramda';

import { getManyMAILSummaryData } from '@/api';
import { supportsMAILMarkets } from '@/constants';
import {
  MAIL_MARKET_BRIDGE_TOKENS,
  MAIL_MARKET_RISKY_TOKENS_ARRAY,
} from '@/sdk/constants';
import { isZeroAddress, safeGetAddress } from '@/utils';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

const makeUniqueRiskyAssets = compose<
  any[],
  ReadonlyArray<string>,
  ReadonlyArray<string>,
  ReadonlyArray<string>,
  ReadonlyArray<string>
>(
  filter(o(not, isZeroAddress)),
  uniq,
  sort((a, b) => (a > b ? 1 : -1)),
  map(safeGetAddress)
);

export const useGetManyMailSummaryData = (
  additionalRiskyTokens: ReadonlyArray<string> = []
) => {
  const { chainId } = useIdAccount();

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
