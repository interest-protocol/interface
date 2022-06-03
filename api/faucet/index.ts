import { ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS } from '@/sdk';
import DineroFaucetABI from '@/sdk/abi/dinero-faucet.abi.json';
import MintABI from '@/sdk/abi/mint.abi.json';
import BTCABI from '@/sdk/abi/test-btc.abi.json';

import {
  DineroFaucetAbi,
  MintAbi,
  TestBtcAbi,
} from '../../types/ethers-contracts';
import { MintFaucetToken, MintMAILFaucetToken } from './faucet.types';

export const mintMAILFaucetToken: MintMAILFaucetToken = (
  signer,
  token,
  account,
  amount
) => {
  const contract = new ethers.Contract(token, MintABI, signer) as MintAbi;

  return contract.mint(account, amount);
};

export const mintBTC: MintFaucetToken = (signer, amount) => {
  const btc = new ethers.Contract(
    CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET],
    BTCABI,
    signer
  ) as TestBtcAbi;

  return btc.mint(amount);
};

export const mintDinero: MintFaucetToken = (signer, amount) => {
  const dineroMinter = new ethers.Contract(
    CONTRACTS.DINERO_FAUCET[CHAIN_ID.BNB_TEST_NET],
    DineroFaucetABI,
    signer
  ) as DineroFaucetAbi;

  return dineroMinter.mint(amount);
};
