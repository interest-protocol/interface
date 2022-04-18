import { BigNumber } from 'ethers';

import { CHAIN_ID } from '@/constants/chains';

export const SECONDS_IN_A_YEAR = BigNumber.from(3.154e7);

export const ZERO = BigNumber.from(0);

export const BLOCKS_PER_YEAR = {
  [CHAIN_ID.BSC_TEST_NET]: 28583 * 365,
  [CHAIN_ID.BSC_MAIN_MET]: 28583 * 365,
  [CHAIN_ID.UNSUPPORTED]: 0,
};
