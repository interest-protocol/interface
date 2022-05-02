import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import { ERC_20_DATA } from '@/constants/erc-20';
import { CurrencyAmount } from '@/sdk';
import DineroFaucetABI from '@/sdk/abi/dinero-faucet.abi.json';
import ERC20ABI from '@/sdk/abi/erc-20.abi.json';
import BTCABI from '@/sdk/abi/test-btc.abi.json';
import { TOKEN_SYMBOL } from '@/sdk/constants';
import { ERC20 } from '@/sdk/entities/erc-20';

import {
  DineroFaucetAbi,
  Erc20Abi,
  TestBtcAbi,
} from '../../types/ethers-contracts';

export const getERC20Data = (chainId: number, address: string): ERC20 =>
  ERC_20_DATA[chainId][ethers.utils.getAddress(address)];

export const getERC20CurrencyAmount = (
  chainId: number,
  address: string,
  amount: string
): CurrencyAmount<ERC20> =>
  CurrencyAmount.fromRawAmount(getERC20Data(chainId, address), amount);

export const getAllowance = (
  account: string,
  spender: string,
  erc20Contract: string,
  provider: Web3Provider
): Promise<BigNumber> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    provider
  ) as Erc20Abi;
  return erc20.allowance(account, spender);
};

export const addAllowance = (
  account: string,
  erc20Contract: string,
  provider: Web3Provider,
  spender: string
): Promise<ContractTransaction> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    provider.getSigner(account)
  ) as Erc20Abi;
  return erc20.approve(spender, ethers.constants.MaxUint256);
};

export const getERC20TotalSupply = (
  erc20Contract: string,
  provider: Web3Provider
): Promise<BigNumber> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    provider
  ) as Erc20Abi;

  return erc20.totalSupply();
};

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
