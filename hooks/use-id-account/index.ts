import { isAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';

import { useChainId } from './../use-chain-id';

export const useIdAccount = (): { chainId: number; account: string } => {
  const { pathname } = useRouter();
  const chainId = useChainId();
  const { address } = useAccount();

  if (!address)
    return {
      chainId,
      account: '',
    };

  // sanity check
  return isAddress(address)
    ? {
        chainId,
        account: address,
      }
    : {
        chainId: SUPPORTED_CHAINS_RECORD[pathname][0],
        account: '',
      };
};
