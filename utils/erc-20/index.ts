import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import DineroFaucetABI from '@/constants/abi/dinero-faucet.abi.json';
import ERC20ABI from '@/constants/abi/erc-20.abi.json';
import BTCABI from '@/constants/abi/test-btc.abi.json';
import { DINERO_FAUCET } from '@/constants/contracts';
import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20.data';

import {
  DineroFaucetAbi,
  Erc20Abi,
  TestBtcAbi,
} from '../../types/ethers-contracts';

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

export const mintBTC = (
  amount: BigNumber,
  signer: JsonRpcSigner
): Promise<ethers.ContractTransaction> => {
  const btc = new ethers.Contract(
    BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address,
    BTCABI,
    signer
  ) as TestBtcAbi;

  return btc.mint(amount);
};

export const mintDinero = (
  amount: BigNumber,
  signer: JsonRpcSigner
): Promise<ethers.ContractTransaction> => {
  const dineroMinter = new ethers.Contract(
    DINERO_FAUCET,
    DineroFaucetABI,
    signer
  ) as DineroFaucetAbi;

  return dineroMinter.mint(amount);
};
