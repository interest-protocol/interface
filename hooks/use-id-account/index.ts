import { isAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { getAccount, getChainId } from '@/state/core/core.selectors';

export const useIdAccount = () => {
  const { pathname } = useRouter();
  const account = useSelector(getAccount) as string;
  const chainId = useSelector(getChainId) as number;

  if (!account)
    return {
      chainId: SUPPORTED_CHAINS_RECORD[pathname][0],
      account,
    };

  // sanity check
  return isAddress(account)
    ? {
        chainId: chainId ?? SUPPORTED_CHAINS_RECORD[pathname][0],
        account,
      }
    : {
        chainId: SUPPORTED_CHAINS_RECORD[pathname][0],
        account: '',
      };
};
