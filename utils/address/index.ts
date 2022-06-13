import { ethers } from 'ethers';
import { always, curryN, equals, not, tryCatch } from 'ramda';

export const isValidAccount = (x: string): boolean =>
  ethers.utils.isAddress(x)
    ? not(equals(ethers.constants.AddressZero, ethers.utils.getAddress(x)))
    : false;

export const safeGetAddress = tryCatch(
  ethers.utils.getAddress,
  always(ethers.constants.AddressZero)
);

export const isSameAddress = curryN(2, (x: string, y: string) => {
  if (!isValidAccount(x) || !isValidAccount(y)) return false;
  return ethers.utils.getAddress(x) === ethers.utils.getAddress(y);
});

export const isZeroAddress = isSameAddress(ethers.constants.AddressZero);
