import { BigNumber, ethers } from 'ethers';

export const CHAIN_ID = {
  BSC_TEST_NET: 97,
  BSC_MAIN_MET: 56,
  UNSUPPORTED: 0,
};

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export enum TOKEN_SYMBOL {
  BTC = 'BTC',
  DNR = 'DNR',
  INT = 'Int',
  Unknown = '???',
}

export enum PoolType {
  Farm,
  Pool,
}

export enum PoolId {
  Int,
  BtcDnr,
}

export const SECONDS_IN_A_YEAR = BigNumber.from(3.154e7);

export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const BLOCKS_PER_YEAR = {
  [CHAIN_ID.BSC_TEST_NET]: 28583 * 365,
  [CHAIN_ID.BSC_MAIN_MET]: 28583 * 365,
  [CHAIN_ID.UNSUPPORTED]: 0,
};

export const INIT_CODE_HASH = {
  PCS_PAIR: {
    [CHAIN_ID.BSC_MAIN_MET]:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    [CHAIN_ID.BSC_TEST_NET]:
      '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  },
};

export const DINERO_MARKET_CONTRACTS = {
  [CHAIN_ID.BSC_TEST_NET]: [
    {
      address: '0x926f8FB78f5769a3D724A8ffC7058528C86939E1',
      collateralSymbol: TOKEN_SYMBOL.BTC,
    },
  ],
  [CHAIN_ID.BSC_MAIN_MET]: [
    {
      address: ethers.constants.AddressZero,
      collateralSymbol: TOKEN_SYMBOL.Unknown,
    },
  ],
};

export const CONTRACTS = {
  DINERO_FAUCET: {
    [CHAIN_ID.BSC_TEST_NET]: '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
  CASA_DE_PAPEL: {
    [CHAIN_ID.BSC_TEST_NET]: '0x4702a58ebdE5E09459052340dD1C1d818FE47D8B',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_V2_PAIR_BTC_DNR: {
    [CHAIN_ID.BSC_TEST_NET]: '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_V2_PAIR_BTC_INT: {
    [CHAIN_ID.BSC_TEST_NET]: '0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_FACTORY: {
    [CHAIN_ID.BSC_MAIN_MET]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    [CHAIN_ID.BSC_TEST_NET]: '0x6725f303b657a9451d8ba641348b6761a6cc7a17',
  },
  MULTI_CALL: {
    [CHAIN_ID.BSC_MAIN_MET]: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    [CHAIN_ID.BSC_TEST_NET]: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
  INTEREST_VIEW: {
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.BSC_TEST_NET]: '0xC64983A2160bBf57A63DF4FcF32260111238Ea00',
  },
  BTC: {
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.BSC_TEST_NET]: '0x954f3A4aeC237D311839d6E0274c0aC8Be13d1b1',
  },
  DNR: {
    [CHAIN_ID.BSC_TEST_NET]: '0x57486681D2E0Bc9B0494446b8c5df35cd20D4E92',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
  INT: {
    [CHAIN_ID.BSC_TEST_NET]: '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
    [CHAIN_ID.BSC_MAIN_MET]: ethers.constants.AddressZero,
  },
};
