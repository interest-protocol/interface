import { ethers } from 'ethers';

import { CHAIN_ID, sortERC20, TOKEN_SYMBOL } from '@/sdk';
import { getBTCAddress } from '@/utils';

import { ERC_20_DATA } from './erc-20';

export const CASA_DE_PAPEL_FARM_RESPONSE_MAP = {
  [CHAIN_ID.BSC_TEST_NET]: {
    baseTokens: [ERC_20_DATA[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.BTC]],
    pools: [
      {
        pair: sortERC20(
          ERC_20_DATA[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.BTC],
          ERC_20_DATA[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.INT]
        ),
        address: ethers.utils.getAddress(
          '0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C'
        ),
      },
      {
        pair: sortERC20(
          ERC_20_DATA[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.BTC],
          ERC_20_DATA[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.DNR]
        ),
        address: ethers.utils.getAddress(
          '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab'
        ),
      },
    ],
  },
};

/**
 * @desc The first item on pairs is to get the reserves to calculate Int Price. It needs to be added again for a specific pool.
 */
export const CASA_DE_PAPEL_FARM_MAP = {
  [CHAIN_ID.BSC_TEST_NET]: {
    // Only need to know the price of BTC
    baseTokens: [getBTCAddress(CHAIN_ID.BSC_TEST_NET)],
    poolIds: [0, 1],
    // [ BTC/INT no Pool id ,BTC/DNR poolId 1]
    pairs: [
      ethers.utils.getAddress('0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C'),
      ethers.utils.getAddress('0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab'),
    ],
  },
};
