import { ContractTransaction, ethers } from 'ethers';

import ERC20ABI from '@/sdk/abi/erc-20.abi.json';
import { getStaticWeb3Provider } from '@/utils';

import { Erc20Abi } from '../../types/ethers-contracts';

export const addAllowance = (
  chainId: number,
  account: string,
  erc20Contract: string,
  spender: string
): Promise<ContractTransaction> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    getStaticWeb3Provider(chainId).getSigner(account)
  ) as Erc20Abi;
  return erc20.approve(spender, ethers.constants.MaxUint256);
};
