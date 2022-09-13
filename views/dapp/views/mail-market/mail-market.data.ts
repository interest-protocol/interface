import { IHeading } from '@/elements/table/table.types';

export const MAIL_MARKET_HEADINGS = (
  symbol: string
): ReadonlyArray<IHeading> => [
  {
    item: 'Market',
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
