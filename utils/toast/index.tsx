import { ContractTransaction } from 'ethers';
import toast from 'react-hot-toast';

import { CHAINS } from '@/constants';

export const showTXSuccessToast = async (
  tx: ContractTransaction
): Promise<void> => {
  const receipt = await tx.wait(5);
  const explorer = CHAINS[tx.chainId].blockExplorerUrls;
  toast(
    <a
      target="__black"
      rel="noreferrer nofollow"
      href={`${explorer ? explorer[0] : ''}/tx/${receipt.transactionHash}`}
    >
      Check on Explorer
    </a>
  );
};
