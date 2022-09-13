import { getMAILMarketData } from '@/api';
import { DEFAULT_ACCOUNT } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetMailMarketData = (mailMarketAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(
    chainId,
    getMAILMarketData,
    [chainId, mailMarketAddress, account || DEFAULT_ACCOUNT, {}],
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );
};
