import { ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS } from '@/sdk';
import DineroFaucetABI from '@/sdk/abi/dinero-faucet.abi.json';
import MintABI from '@/sdk/abi/mint.abi.json';
import BTCABI from '@/sdk/abi/test-btc.abi.json';
import { isSameAddress } from '@/utils';

import {
  DineroFaucetAbi,
  MintAbi,
  TestBtcAbi,
} from '../../types/ethers-contracts';
import { MintFaucetToken, MintMAILFaucetToken } from './faucet.types';

// TODO: Need improvement

export const mintETHFaucetToken: MintMAILFaucetToken = (
  signer,
  token,
  amount,
  account
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

export const mintBNBFaucet: MintFaucetToken = (signer, token, amount) => {
  const contract = new ethers.Contract(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...(isSameAddress(CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET], token)
      ? [CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET], BTCABI, signer]
      : [
          CONTRACTS.DINERO_FAUCET[CHAIN_ID.BNB_TEST_NET],
          DineroFaucetABI,
          signer,
        ])
  ) as DineroFaucetAbi | TestBtcAbi;

  return contract.mint(amount);
};

export const mintFaucetToken = {
  [CHAIN_ID.RINKEBY]: mintETHFaucetToken,
  [CHAIN_ID.BNB_TEST_NET]: mintBNBFaucet,
};
