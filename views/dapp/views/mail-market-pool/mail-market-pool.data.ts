import { TMailMarketData } from './mail-market-pool.types';

export const MAIL_MARKET_HEADINGS = [
  {
    item: 'Symbol',
  },
  {
    item: 'Name',
  },
  {
    item: 'Address',
  },
];

export const MAIL_MARKET_POOL_DATA: TMailMarketData = [
  {
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    symbol: 'BTC',
    name: 'BitCoin',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  },
  {
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    symbol: 'ETH',
    name: 'Ethers',
    address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
  },
  {
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
  },
  {
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    symbol: 'USDT',
    name: 'Tether',
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
  },
];
