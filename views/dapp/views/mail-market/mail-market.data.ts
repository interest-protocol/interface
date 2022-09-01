import { IHeading } from '@/elements/table/table.types';

export const MAIL_MARKET_HEADINGS = (
  symbol: string,
  market: string
): ReadonlyArray<IHeading> => [
  {
    item: market,
  },
  {
    item: '',
  },
  {
    item: symbol,
  },
  {
    item: 'BTC',
  },
  {
    item: 'ETH',
  },
  {
    item: 'USDC',
  },
  {
    item: 'USDT',
  },
];
