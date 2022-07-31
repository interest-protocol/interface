import { isAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { getAccount } from '@/state/core/core.selectors';

import { useChainId } from './../use-chain-id/index';

export const useIdAccount = (): { chainId: number; account: string } => {
  const { pathname } = useRouter();
  const chainId = useChainId();
  const account = useSelector(getAccount) as string;

  if (!account)
    return {
      chainId,
      account,
    };

  // sanity check
  return isAddress(account)
    ? {
        chainId,
        account,
      }
    : {
        chainId: SUPPORTED_CHAINS_RECORD[pathname][0],
        account: '',
      };
};
