import { MailMarketsSummaryData } from '@/interface';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { CONTRACTS, MAIL_MARKET_CONTRACTS_MAP } from '@/sdk/constants';
import { ApeCoinSVG, UniSwapSVG } from '@/svg';

export const MAIL_MARKET_METADATA_MAP = {
  [CHAIN_ID.RINKEBY]: {
    [CONTRACTS.UNI[CHAIN_ID.RINKEBY]]: {
      Icon: UniSwapSVG,
      symbol: TOKEN_SYMBOL.UNI,
      name: 'Uniswap',
      market:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.UNI]
          .marketAddress,
    },
    [CONTRACTS.APE[CHAIN_ID.RINKEBY]]: {
      Icon: ApeCoinSVG,
      symbol: TOKEN_SYMBOL.APE,
      name: 'Ape coin',
      market:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.APE]
          .marketAddress,
    },
  },
} as Record<number, Record<string, MailMarketsSummaryData>>;
