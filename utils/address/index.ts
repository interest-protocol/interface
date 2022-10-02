import { ethers } from 'ethers';
import { always, curryN, equals, not, tryCatch } from 'ramda';

import { WRAPPED_NATIVE_TOKEN } from '@/constants';
import { CHAIN_ID, ZERO_ADDRESS } from '@/sdk';

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

export const processWrappedNativeTokenAddress = (
  chainId: number,
  token: string
) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId]
    ? WRAPPED_NATIVE_TOKEN[chainId]
    : WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET];

  return isSameAddressZ(token, ZERO_ADDRESS)
    ? wrappedNativeToken.address
    : token;
};

export const replaceWrappedNativeTokenAddressWithZero = (
  chainId: number,
  address: string
) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId]
    ? WRAPPED_NATIVE_TOKEN[chainId]
    : WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET];

  return isSameAddressZ(address, wrappedNativeToken.address)
    ? ZERO_ADDRESS
    : address;
};

export const getSafeWrappedNativeToken = (chainId: number) =>
  WRAPPED_NATIVE_TOKEN[chainId] ?? WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET];
