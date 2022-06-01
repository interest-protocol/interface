import { ethers } from 'ethers';
import { curryN, equals, not, useWith as rUseWith } from 'ramda';

export const isValidAccount = (x: string): boolean =>
  ethers.utils.isAddress(x)
    ? not(equals(ethers.constants.AddressZero, ethers.utils.getAddress(x)))
    : false;

export const isSameAddress = curryN(
  2,
  rUseWith<string, string, string, string, boolean>(equals, [
    ethers.utils.getAddress,
    ethers.utils.getAddress,
  ])
);

export const isZeroAddress = isSameAddress(ethers.constants.AddressZero);
