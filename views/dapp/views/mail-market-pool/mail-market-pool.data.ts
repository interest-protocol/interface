import { BitcoinSVG, EtherSVG, TetherSVG, USDCoinSVG } from '@/svg';

import { IMailMarketPoolTypeData } from './mail-market-pool.types';

export const MY_MAIL_MARKET_POOL_HEADINGS = {
  supply: [
    {
      item: 'Symbol',
    },
    {
      item: 'APR',
    },
    {
      item: 'Balance',
    },
  ],
  borrow: [
    {
      item: 'Symbol',
    },
    {
      item: 'APR',
    },
    {
      item: 'Balance',
    },
    {
      item: '% of Risk',
    },
  ],
};
export const MAIL_MARKET_POOL_HEADINGS = {
  supply: [
    {
      item: 'Symbol',
    },
    {
      item: 'APR',
    },
  ],
  borrow: [
    {
      item: 'Symbol',
    },
    {
      item: 'APR',
    },
    {
      item: 'Liquidity',
    },
  ],
};

export const MAIL_MARKET_POOL_DATA: IMailMarketPoolTypeData = {
  supply: [
    {
      Icon: BitcoinSVG,
      symbol: 'BTC',
      name: 'BitCoin',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      apr: 75,
    },
    {
      symbol: 'ETH',
      Icon: EtherSVG,
      name: 'Ethers',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
    },
    {
      symbol: 'USDC',
      Icon: USDCoinSVG,
      name: 'USD Coin',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
    },
    {
      symbol: 'USDT',
      Icon: TetherSVG,
      name: 'Tether',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      apr: 75,
    },
  ],
  borrow: [
    {
      symbol: 'BTC',
      name: 'BitCoin',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      apr: 75,
      Icon: BitcoinSVG,
    },
    {
      symbol: 'ETH',
      name: 'Ethers',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      Icon: EtherSVG,
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      Icon: USDCoinSVG,
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      apr: 75,
      Icon: TetherSVG,
    },
  ],
};
