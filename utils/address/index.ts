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

// Z because it supports the Zero address
export const isSameAddressZ = curryN(2, (x: string, y: string) => {
  if (!ethers.utils.isAddress(x) || !ethers.utils.isAddress(x)) return false;
  return ethers.utils.getAddress(x) === ethers.utils.getAddress(y);
});

export const isZeroAddress = (x: string) =>
  safeGetAddress(x) === safeGetAddress(ethers.constants.AddressZero);

export const processWrappedNativeTokenAddress = (token: string) => {
  return token;
};

export const replaceWrappedNativeTokenAddressWithZero = (address: string) => {
  return address;
};
