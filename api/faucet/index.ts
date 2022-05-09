import { ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS } from '@/sdk';
import DineroFaucetABI from '@/sdk/abi/dinero-faucet.abi.json';
import BTCABI from '@/sdk/abi/test-btc.abi.json';

import { DineroFaucetAbi, TestBtcAbi } from '../../types/ethers-contracts';
import { MintFaucetToken } from './faucet.types';

export const mintBTC: MintFaucetToken = (signer, amount) => {
  const btc = new ethers.Contract(
    CONTRACTS.BTC[CHAIN_ID.BSC_TEST_NET],
    BTCABI,
    signer
  ) as TestBtcAbi;

  return btc.mint(amount);
};

export const mintDinero: MintFaucetToken = (signer, amount) => {
  const dineroMinter = new ethers.Contract(
    CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET],
    DineroFaucetABI,
    signer
  ) as DineroFaucetAbi;

  return dineroMinter.mint(amount);
};
