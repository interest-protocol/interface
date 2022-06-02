import { MailMarketsSummaryData } from '@/interface';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { CONTRACTS, MAIL_MARKET_CONTRACTS_MAP } from '@/sdk/constants';

export const MAIL_MARKET_METADATA_MAP = {
  [CHAIN_ID.RINKEBY]: {
    [CONTRACTS.UNI[CHAIN_ID.RINKEBY]]: {
      symbol: TOKEN_SYMBOL.UNI,
      name: 'Uniswap',
      market:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.UNI]
          .marketAddress,
      token:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.UNI]
          .riskyTokenAddress,
    },
    [CONTRACTS.APE[CHAIN_ID.RINKEBY]]: {
      symbol: TOKEN_SYMBOL.APE,
      name: 'ApeCoin',
      market:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.APE]
          .marketAddress,
      token:
        MAIL_MARKET_CONTRACTS_MAP[CHAIN_ID.RINKEBY][TOKEN_SYMBOL.APE]
          .riskyTokenAddress,
    },
  },
} as Record<number, Record<string, MailMarketsSummaryData>>;
