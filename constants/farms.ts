import { PoolId, TOKEN_SYMBOL } from '@/sdk/constants';

import { BSC_TEST_ERC_20_DATA, UNKNOWN_ERC_20 } from './erc-20';

export const FARMS = {
  [PoolId.Int]: {
    farmName: 'Interest Token',
    farmSymbol: 'INT',
    id: 0,
    stakingToken: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.INT],
    token0: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.INT],
    token1: UNKNOWN_ERC_20,
  },
};
