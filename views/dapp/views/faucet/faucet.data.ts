import { getAddress } from 'ethers/lib/utils';

import { CHAIN_ID } from '@/sdk';
import {
  getBTCAddress,
  getBUSDAddress,
  getDNRAddress,
  getETHERC20Address,
  getUSDCAddress,
  getUSDTAddress,
} from '@/utils';

export const FAUCET_TOKEN_MAX_AMOUNT = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getAddress(getBTCAddress(CHAIN_ID.BNB_TEST_NET))]: 5,
    [getAddress(getDNRAddress(CHAIN_ID.BNB_TEST_NET))]: 10_000,
    [getAddress(getUSDTAddress(CHAIN_ID.BNB_TEST_NET))]: 10_000,
    [getAddress(getUSDCAddress(CHAIN_ID.BNB_TEST_NET))]: 10_000,
    [getAddress(getETHERC20Address(CHAIN_ID.BNB_TEST_NET))]: 5,
    [getAddress(getBUSDAddress(CHAIN_ID.BNB_TEST_NET))]: 10_000,
  },
};
