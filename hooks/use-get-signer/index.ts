import { useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { isChainIdSupported } from '@/constants';
import { getAccount, getChainId } from '@/state/core/core.selectors';

const { usePriorityProvider } = priorityHooks;

export const useGetSigner = () => {
  const account = useSelector(getAccount) as string;
  const chainId = useSelector(getChainId) as number | null;
  const provider = usePriorityProvider(
    !!chainId && isChainIdSupported(chainId) ? chainId : ''
  );

  return {
    signer: provider ? provider.getSigner(account) : null,
    account,
    chainId,
  };
};
