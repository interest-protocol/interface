import { Network } from '@mysten/sui.js';

export const FAUCET_TOKENS_TYPE = {
  [Network.DEVNET]: {
    BTC: '',
    BNB: 'dynamic_field::Field<0x1::ascii::String, 0x2::balance::Supply<0x44f8cf5a3d0c63db4f899794cd9eee5c499736ab::coins::BNB>>',
    USDT: '',
    USDC: '',
    DAI: '',
    SUI: '0x2::coin::Coin<0x2::sui::SUI>',
  },
};
