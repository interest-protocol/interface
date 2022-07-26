import { getWETHContract } from '@/utils';

import { WethDeposit, WethWithdraw } from './weth.types';

export const wethDeposit: WethDeposit = (chainId, signer, value) =>
  getWETHContract(chainId, signer).deposit({ value });

export const wethWithdraw: WethWithdraw = (chainId, signer, amount) =>
  getWETHContract(chainId, signer).withdraw(amount);
