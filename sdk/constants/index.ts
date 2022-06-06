import { BigNumber, ethers } from 'ethers';

export const CHAIN_ID = {
  BNB_TEST_NET: 97,
  BNB_MAIN_MET: 56,
  RINKEBY: 4,
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
  ETH = 'ETH',
  Unknown = '???',
  WBNB = 'WBNB',
  BNB = 'BNB',
  UNI = 'UNI',
  APE = 'APE',
  MANA = 'MANA',
  LINK = 'LINK',
  SHIB = 'SHIB',
  WETH = 'WETH',
  USDC = 'USDC',
  USDT = 'USDT',
}

export enum PoolId {
  Int,
  BtcDnr,
}

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const SECONDS_IN_A_YEAR = BigNumber.from(3.154e7);

export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const BLOCKS_PER_YEAR = {
  [CHAIN_ID.RINKEBY]: 6092 * 365,
  [CHAIN_ID.BNB_TEST_NET]: 28583 * 365,
  [CHAIN_ID.BNB_MAIN_MET]: 28583 * 365,
  [CHAIN_ID.UNSUPPORTED]: 0,
};

export const INIT_CODE_HASH = {
  PCS_PAIR: {
    [CHAIN_ID.BNB_MAIN_MET]:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    [CHAIN_ID.BNB_TEST_NET]:
      '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  },
};

export const DINERO_MARKET_CONTRACTS = {
  [CHAIN_ID.BNB_TEST_NET]: [
    {
      marketAddress: ethers.utils.getAddress(
        '0x926f8FB78f5769a3D724A8ffC7058528C86939E1'
      ),
      collateralSymbol: TOKEN_SYMBOL.BTC,
      collateralAddress: ethers.utils.getAddress(
        '0x954f3A4aeC237D311839d6E0274c0aC8Be13d1b1'
      ),
    },
  ],
  [CHAIN_ID.BNB_MAIN_MET]: [
    {
      marketAddress: ethers.constants.AddressZero,
      collateralSymbol: TOKEN_SYMBOL.Unknown,
      collateralAddress: ethers.constants.AddressZero,
    },
  ],
};

export const MAIL_MARKET_CONTRACTS_MAP = {
  [CHAIN_ID.RINKEBY]: {
    [TOKEN_SYMBOL.UNI]: {
      marketAddress: ethers.utils.getAddress(
        '0x7FbA296D2FB1e8e46039784c00aDfbDdF0CCDb62'
      ),
      riskyTokenAddress: ethers.utils.getAddress(
        '0xc17A30Db808A7926E76F5AC81352A214FfFDC334'
      ),
    },
    [TOKEN_SYMBOL.APE]: {
      marketAddress: ethers.utils.getAddress(
        '0x739c966c9774e79022754f33bfa0f304f17b4ab7'
      ),
      riskyTokenAddress: ethers.utils.getAddress(
        '0xBAe5a5b6ecF2de7424eA8723e3be2A692dCB0637'
      ),
    },
  },
};

export const MAIL_MARKET_RISKY_TOKENS_ARRAY = {
  [CHAIN_ID.RINKEBY]: [
    ethers.utils.getAddress('0xc17A30Db808A7926E76F5AC81352A214FfFDC334'), // UNI
    ethers.utils.getAddress('0xBAe5a5b6ecF2de7424eA8723e3be2A692dCB0637'), // APE
  ],
};

export const MAIL_MARKET_BRIDGE_TOKENS = {
  [CHAIN_ID.RINKEBY]: [
    '0xbdBFEBE240a4606119bC950Eec3e0Ed05719d739', // BTC
    '0xbA8d9f4d5c14f2CC644CcC06bB298FbD6DaC349C', // WETH
    '0xf3706E14c4aE1bd94f65909f9aB9e30D8C1b7B16', // USDC
    '0xb306ee3d2092166cb942D1AE2210A7641f73c11F', // USDT
  ],
};

export const DINERO_MARKET_CONTRACT_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [TOKEN_SYMBOL.BTC]: ethers.utils.getAddress(
      '0x926f8FB78f5769a3D724A8ffC7058528C86939E1'
    ),
  },
} as { [key: number]: Record<TOKEN_SYMBOL, string> };

export const CONTRACTS = {
  DINERO_FAUCET: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  CASA_DE_PAPEL: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x4702a58ebdE5E09459052340dD1C1d818FE47D8B',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_V2_PAIR_BTC_DNR: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_V2_PAIR_BTC_INT: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  PCS_FACTORY: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_MAIN_MET]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    [CHAIN_ID.BNB_TEST_NET]: '0x6725f303b657a9451d8ba641348b6761a6cc7a17',
  },
  MULTI_CALL: {
    [CHAIN_ID.BNB_MAIN_MET]: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    [CHAIN_ID.BNB_TEST_NET]: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
  INTEREST_VIEW_BALANCES: {
    [CHAIN_ID.RINKEBY]: '0x2b122FB8E1B4b21bC3b0Bc57199b21d07E58Ec5c',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0xaB852f3c3c926bd2430E7d6358441ee1ddbc2cF1',
  },
  INTEREST_VIEW_MAIL: {
    [CHAIN_ID.RINKEBY]: '0xAbbeFCc2122EE6253F95706263c643F785f991d3',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  INTEREST_VIEW_DINERO: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x0E34A52922770f7eb965688aa251a872eb3481aE',
  },
  BTC: {
    [CHAIN_ID.BNB_TEST_NET]: '0x954f3A4aeC237D311839d6E0274c0aC8Be13d1b1',
    [CHAIN_ID.RINKEBY]: '0xbdBFEBE240a4606119bC950Eec3e0Ed05719d739',
  },
  WETH: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xbA8d9f4d5c14f2CC644CcC06bB298FbD6DaC349C',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  USDC: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xf3706E14c4aE1bd94f65909f9aB9e30D8C1b7B16',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  USDT: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xb306ee3d2092166cb942D1AE2210A7641f73c11F',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  LINK: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0x4377731483078e446e3BA1dee44B18b20E46437f',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  APE: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xBAe5a5b6ecF2de7424eA8723e3be2A692dCB0637',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  SHIB: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xe2117a2F453b8Eb5E48D30b1A85342b9FDD11eDA',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  MANA: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0x3E1b5B41dc490D305DFb946fAED4369E9A0a1ae8',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  DNR: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x57486681D2E0Bc9B0494446b8c5df35cd20D4E92',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  INT: {
    [CHAIN_ID.RINKEBY]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_TEST_NET]: '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  UNI: {
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
    [CHAIN_ID.RINKEBY]: '0xc17A30Db808A7926E76F5AC81352A214FfFDC334',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
  },
  TOKEN_MINTER: {
    [CHAIN_ID.RINKEBY]: '0x52cdaec4E208F96144A54Fc5d700a145Ea731Fe9',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
  MAIL_DEPLOYER: {
    [CHAIN_ID.RINKEBY]: '0xDD02a8A5630b4fD156e5311550746965E17279a3',
    [CHAIN_ID.BNB_TEST_NET]: ethers.constants.AddressZero,
    [CHAIN_ID.BNB_MAIN_MET]: ethers.constants.AddressZero,
  },
};
