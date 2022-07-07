import { CHAIN_ID } from '@/sdk';
import { getETHERC20Address, getUSDCAddress, getWETHAddress } from '@/utils';

export const SWAP_BASES = {
  [CHAIN_ID.BNB_MAIN_MET]: [],
  [CHAIN_ID.RINKEBY]: [],
  [CHAIN_ID.BNB_TEST_NET]: [
    getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
    getUSDCAddress(CHAIN_ID.BNB_TEST_NET),
    getWETHAddress(CHAIN_ID.BNB_TEST_NET),
  ],
};
