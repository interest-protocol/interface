import { ethers } from 'ethers';
import { and, equals, not } from 'ramda';

export const isValidAccount = (x: string): boolean =>
  and(
    ethers.utils.isAddress(x),
    not(equals(ethers.constants.AddressZero, ethers.utils.getAddress(x)))
  );
