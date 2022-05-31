import { useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { isChainIdSupported } from '@/constants';
import { CHAIN_ID } from '@/sdk';
import { getAccount, getChainId } from '@/state/core/core.selectors';

const { usePriorityProvider } = priorityHooks;

export const useGetSigner = () => {
  const account = useSelector(getAccount) as string;
  const chainId = useSelector(getChainId) as number | null;
  const provider = usePriorityProvider(
    !!chainId && isChainIdSupported(chainId) ? chainId : CHAIN_ID.BNB_TEST_NET
  );

  return {
    signer: provider && account ? provider.getSigner(account) : null,
    account,
    chainId,
  };
};
