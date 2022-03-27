import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { CHAIN_ID } from '@/sdk/chains';

export const DINERO_MARKET_CONTRACTS = {
  [CHAIN_ID.BSC_TEST_NET as number]: [
    {
      contract: '0x06b4A3622410270C40621D2E8E855386c54c323f',
      collateral: BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC],
    },
  ],
};
