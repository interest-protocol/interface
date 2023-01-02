import { Network } from '@mysten/sui.js';
import { equals } from 'ramda';

export const COIN_TYPE_TO_NAME = {
  [Network.DEVNET]: {
    'dynamic_field::Field<0x1::ascii::String, 0x2::balance::Supply<0x44f8cf5a3d0c63db4f899794cd9eee5c499736ab::coins::BNB>>':
      'BNB',
    '0x2::coin::Coin<0x2::sui::SUI>': 'Sui',
  },
};

export const COIN_TYPE = {
  [Network.DEVNET]: {
    SUI: '0x2::coin::Coin<0x2::sui::SUI>',
  },
};

export const isSuiType = equals(COIN_TYPE[Network.DEVNET].SUI);
