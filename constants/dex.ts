import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { getETHERC20Address, getUSDCAddress } from '@/utils';

export const SWAP_BASES = {
  [CHAIN_ID.BNB_MAIN_MET]: [],
  [CHAIN_ID.RINKEBY]: [],
  [CHAIN_ID.BNB_TEST_NET]: [
    {
      symbol: TOKEN_SYMBOL.ETH,
      decimals: 18,
      name: 'Ether',
      address: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
      chainId: CHAIN_ID.BNB_TEST_NET,
    },
    {
      symbol: TOKEN_SYMBOL.USDC,
      decimals: 6,
      name: 'USD Coin',
      address: getUSDCAddress(CHAIN_ID.BNB_TEST_NET),
      chainId: CHAIN_ID.BNB_TEST_NET,
    },
  ],
};
