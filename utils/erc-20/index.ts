import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

import ERC20ABI from '@/constants/abi/erc-20.abi.json';

import { Erc20Abi } from '../../types/ethers-contracts';

export const getERC20Balance = (
  account: string,
  erc20Contract: string,
  provider: Web3Provider
): Promise<BigNumber> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    provider
  ) as Erc20Abi;
  return erc20.balanceOf(account);
};
