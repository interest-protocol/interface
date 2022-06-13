import { getMAILMarketMetadata } from '@/api';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

export const useGetMailMarketMetadata = (token: string) => {
  const { chainId } = useIdAccount();

  return useCallContract(chainId, getMAILMarketMetadata, [chainId, token], {
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });
};
