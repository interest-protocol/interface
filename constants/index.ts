import { CHAIN_ID } from '@/sdk';
import {
  BscScanSVG,
  ChainLinkSVG,
  EtherScanSVG,
  RedStoneSVG,
  UnknownCoinSVG,
} from '@/svg';

import { SyntheticOracleType } from './synthetics';

export * from './chains';
export * from './dex';
export * from './dinero-markets';
export * from './erc-20';
export * from './farms';
export * from './fiat-ramp';
export * from './routes';
export * from './social-media';
export * from './synthetics';
export * from './vaults';
export * from './wallets';

export enum StakeState {
  Stake,
  Unstake,
}

export const DEFAULT_ERC_20_DECIMALS = 18;

export const DEFAULT_ACCOUNT = '0x000000000000000000000000000000000000dEaD';

export const EXPLORER_MAP = {
  [CHAIN_ID.RINKEBY]: EtherScanSVG,
  [CHAIN_ID.BNB_MAIN_NET]: BscScanSVG,
  [CHAIN_ID.BNB_TEST_NET]: BscScanSVG,
  [CHAIN_ID.UNSUPPORTED]: UnknownCoinSVG,
};

export const ORACLE_SVG_MAP = {
  [SyntheticOracleType.ChainLink]: ChainLinkSVG,
  [SyntheticOracleType.RedStoneConsumer]: RedStoneSVG,
  [SyntheticOracleType.RedStonePriceAware]: RedStoneSVG,
};
