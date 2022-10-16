import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { UseContractArgs } from '@/interface';
import ERC20ABI from '@/sdk/abi/erc-20.abi.json';

export const useApprove = (
  addressOrName: string,
  spender: string,
  args = {} as UseContractArgs
) => {
  const { config } = usePrepareContractWrite({
    addressOrName,
    contractInterface: ERC20ABI,
    functionName: 'approve',
    args: [spender, ethers.constants.MaxUint256],
    ...args,
  });

  return useContractWrite(config);
};
