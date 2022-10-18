import { CHAIN_ID } from '@/sdk';
import { BscscanSVG, EtherscanSVG, UnknownCoinSVG } from '@/svg';

export const EXPLORER_MAP = {
  [CHAIN_ID.RINKEBY]: EtherscanSVG,
  [CHAIN_ID.BNB_MAIN_NET]: BscscanSVG,
  [CHAIN_ID.BNB_TEST_NET]: BscscanSVG,
  [CHAIN_ID.UNSUPPORTED]: UnknownCoinSVG,
};
