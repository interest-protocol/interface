import { useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { useChainId } from '@/hooks';
import { getAccount } from '@/state/core/core.selectors';

const { usePriorityProvider } = priorityHooks;

export const useGetSigner = () => {
  const chainId = useChainId();
  const account = useSelector(getAccount) as string;
  const provider = usePriorityProvider(chainId);

  return {
    signer: provider && account ? provider.getSigner(account) : null,
    account,
    chainId,
  };
};
