import { CHAIN_ID } from '@/sdk';
import { BscScanSVG, EtherScanSVG, UnknownCoinSVG } from '@/svg';

export * from './chains';
export * from './dex';
export * from './erc-20';
export * from './routes';
export * from './social-media';
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
