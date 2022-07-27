import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { getChainId } from '@/state/core/core.selectors';

export const useChainId = () => {
  const { pathname } = useRouter();
  const chainId = useSelector(getChainId) as number;

  return chainId ? chainId : SUPPORTED_CHAINS_RECORD[pathname][0];
};
