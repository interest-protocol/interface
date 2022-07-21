import { ethers } from 'ethers';

import MintABI from '@/sdk/abi/mint.abi.json';
import MintOldABI from '@/sdk/abi/mint-old.abi.json';

import { MintAbi } from '../../types/ethers-contracts';
import { ERC20Mint, ERC20MintOld } from './faucet.types';

// TODO: Need improvement

export const erc20Mint: ERC20Mint = (signer, token, account, amount) => {
  const contract = new ethers.Contract(token, MintABI, signer) as MintAbi;

  return contract.mint(account, amount);
};

export const erc20MintOld: ERC20MintOld = (signer, token, amount) => {
  const contract = new ethers.Contract(token, MintOldABI, signer);

  return contract.mint(amount);
};

export const mintFaucetToken = {
  new: erc20Mint,
  old: erc20MintOld,
};
