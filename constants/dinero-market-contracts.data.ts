import { CHAIN_ID } from '@/constants/chains';
import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20.data';

export const DINERO_MARKET_CONTRACTS = {
  [CHAIN_ID.BSC_TEST_NET as number]: [
    {
      contract: '0x926f8FB78f5769a3D724A8ffC7058528C86939E1',
      collateral: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC],
    },
  ],
};

export const DINERO_MARKET_CONTRACTS_MAP = {
  [CHAIN_ID.BSC_TEST_NET as number]: {
    [TOKEN_SYMBOL.BTC as string]: '0x926f8FB78f5769a3D724A8ffC7058528C86939E1',
  },
};
