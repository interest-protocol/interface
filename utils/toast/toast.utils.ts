import { CHAIN_ID } from '@/sdk';
import { BscScanSVG, EtherScanSVG, UnknownCoinSVG } from '@/svg';

export const EXPLORER_MAP = {
  [CHAIN_ID.RINKEBY]: EtherScanSVG,
  [CHAIN_ID.BNB_MAIN_NET]: BscScanSVG,
  [CHAIN_ID.BNB_TEST_NET]: BscScanSVG,
  [CHAIN_ID.UNSUPPORTED]: UnknownCoinSVG,
};
