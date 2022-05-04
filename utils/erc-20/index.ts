import { BigNumberish, ethers } from 'ethers';

import { ERC_20_DATA } from '@/constants/erc-20';
import { CurrencyAmount } from '@/sdk';
import { ERC20 } from '@/sdk/entities/erc-20';

export const getERC20Data = (chainId: number, address: string): ERC20 =>
  ERC_20_DATA[chainId][ethers.utils.getAddress(address)];

export const getERC20CurrencyAmount = (
  chainId: number,
  address: string,
  amount: BigNumberish
): CurrencyAmount<ERC20> =>
  CurrencyAmount.fromRawAmount(getERC20Data(chainId, address), amount);
