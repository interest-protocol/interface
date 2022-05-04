import { ethers } from 'ethers';
import { and, equals, not, useWith as rUseWith } from 'ramda';

export const isValidAccount = (x: string): boolean =>
  and(
    ethers.utils.isAddress(x),
    not(equals(ethers.constants.AddressZero, ethers.utils.getAddress(x)))
  );

export const isSameAddress = rUseWith<string, string, string, string, boolean>(
  equals,
  [ethers.utils.getAddress, ethers.utils.getAddress]
);
