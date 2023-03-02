import { Network } from '@mysten/sui.js';

import { COIN_TYPE, COINS } from '@/constants';

export const COIN_PRICES = [
  COINS[Network.DEVNET].ETH.type,
  COINS[Network.DEVNET].BTC.type,
  COINS[Network.DEVNET].DAI.type,
  COINS[Network.DEVNET].BNB.type,
  COINS[Network.DEVNET].USDT.type,
  COINS[Network.DEVNET].USDC.type,
];

export const FARM_TYPE_ARGS = [
  COIN_TYPE[Network.DEVNET].IPX,
  COIN_TYPE[Network.DEVNET].V_LP_SUI_ETH,
  COIN_TYPE[Network.DEVNET].V_LP_ETH_IPX,
  COIN_TYPE[Network.DEVNET].V_LP_BTC_ETH,
  COIN_TYPE[Network.DEVNET].V_LP_BNB_ETH,
  COIN_TYPE[Network.DEVNET].V_LP_ETH_USDT,
  COIN_TYPE[Network.DEVNET].V_LP_ETH_USDC,
  COIN_TYPE[Network.DEVNET].V_LP_DAI_ETH,
];

export const FILLED_FARM_TYPE_ARGS = FARM_TYPE_ARGS.concat([
  COIN_TYPE[Network.DEVNET].V_LP_DAI_ETH,
  COIN_TYPE[Network.DEVNET].V_LP_DAI_ETH,
]);

export const POOL_TYPE_ARGS = [
  COIN_TYPE[Network.DEVNET].SUI,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].IPX,
  COIN_TYPE[Network.DEVNET].BTC,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].BNB,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].USDT,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].USDC,
  COIN_TYPE[Network.DEVNET].DAI,
  COIN_TYPE[Network.DEVNET].ETH,
];

export const FILLED_POOL_TYPE_ARGS = POOL_TYPE_ARGS.concat([
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].USDT,
  COIN_TYPE[Network.DEVNET].ETH,
  COIN_TYPE[Network.DEVNET].USDC,
  COIN_TYPE[Network.DEVNET].DAI,
  COIN_TYPE[Network.DEVNET].ETH,
]);
