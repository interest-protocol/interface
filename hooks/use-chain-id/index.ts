import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { getChainId } from '@/state/core/core.selectors';

export const useChainId = (): number => {
  const { pathname } = useRouter();
  const chainId = useSelector(getChainId) as number;

  return SUPPORTED_CHAINS_RECORD[pathname].includes(chainId || -1)
    ? chainId
    : SUPPORTED_CHAINS_RECORD[pathname][0];
};
