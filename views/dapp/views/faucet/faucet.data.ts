import { getAddress } from 'ethers/lib/utils';

import { CHAIN_ID } from '@/sdk';
import {
  getAPEAddress,
  getBTCAddress,
  getDNRAddress,
  getETHERC20Address,
  getUNIAddress,
  getUSDCAddress,
  getUSDTAddress,
  getWETHAddress,
} from '@/utils';

export const FAUCET_TOKEN_MAX_AMOUNT = {
  [CHAIN_ID.RINKEBY]: {
    [getAddress(getBTCAddress(CHAIN_ID.RINKEBY))]: 100,
    [getAddress(getWETHAddress(CHAIN_ID.RINKEBY))]: 100,
    [getAddress(getUSDTAddress(CHAIN_ID.RINKEBY))]: 1_000_000,
    [getAddress(getUSDCAddress(CHAIN_ID.RINKEBY))]: 1_000_000,
    [getAddress(getUNIAddress(CHAIN_ID.RINKEBY))]: 10_000,
    [getAddress(getAPEAddress(CHAIN_ID.RINKEBY))]: 10_000,
  },
  [CHAIN_ID.BNB_TEST_NET]: {
    [getAddress(getBTCAddress(CHAIN_ID.BNB_TEST_NET))]: 10,
    [getAddress(getDNRAddress(CHAIN_ID.BNB_TEST_NET))]: 250_000,
    [getAddress(getUSDTAddress(CHAIN_ID.BNB_TEST_NET))]: 1_000_000,
    [getAddress(getUSDCAddress(CHAIN_ID.BNB_TEST_NET))]: 1_000_000,
    [getAddress(getETHERC20Address(CHAIN_ID.BNB_TEST_NET))]: 50,
  },
};
