import { useSelector } from 'react-redux';

import { getMAILMarketMetadata } from '@/api';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';
import useSupportedChain from '../use-supported-chain';

export const useGetMailMarketMetadata = (token: string) => {
  const chainId = useSupportedChain(useSelector(getChainId) as number | null);

  return useCallContract(chainId, getMAILMarketMetadata, [chainId, token], {
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });
};
