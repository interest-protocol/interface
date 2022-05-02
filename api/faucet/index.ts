import { ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS } from '@/sdk';
import DineroFaucetABI from '@/sdk/abi/dinero-faucet.abi.json';
import BTCABI from '@/sdk/abi/test-btc.abi.json';
import { getSigner } from '@/utils';

import { DineroFaucetAbi, TestBtcAbi } from '../../types/ethers-contracts';
import { MintFaucetToken } from './faucet.types';

export const mintBTC: MintFaucetToken = (amount, account) => {
  const btc = new ethers.Contract(
    CONTRACTS.BTC[CHAIN_ID.BSC_TEST_NET],
    BTCABI,
    getSigner(CHAIN_ID.BSC_TEST_NET, account)
  ) as TestBtcAbi;

  return btc.mint(amount);
};

export const mintDinero: MintFaucetToken = (amount, account) => {
  const dineroMinter = new ethers.Contract(
    CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET],
    DineroFaucetABI,
    getSigner(CHAIN_ID.BSC_TEST_NET, account)
  ) as DineroFaucetAbi;

  return dineroMinter.mint(amount);
};
