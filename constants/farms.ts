import {
  BSC_TEST_ERC_20_DATA,
  makePCSLpToken,
  TOKEN_SYMBOL,
  UNKNOWN_ERC_20,
} from './erc-20';

export enum PoolType {
  Farm,
  Pool,
}

export enum PoolId {
  Int,
  BtcDnr,
}

export const FARMS = {
  [PoolId.Int]: {
    farmName: 'Interest Token',
    farmSymbol: 'INT',
    id: 0,
    stakingToken: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.INT],
    token0: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.INT],
    token1: UNKNOWN_ERC_20,
  },
  [PoolId.BtcDnr]: {
    farmName: 'BTC-DNR',
    farmSymbol: 'BTC-DNR',
    id: 1,
    stakingToken: makePCSLpToken('0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab'),
    token0: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.DNR],
    token1: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC],
  },
};
