import { BitcoinSVG, EtherSVG, TetherSVG, USDCoinSVG } from '@/svg';

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

export const MAIL_MARKET_POOL_DATA = {
  supply: [
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      Icon: BitcoinSVG,
      symbol: 'BTC',
      name: 'BitCoin',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      apr: 75,
      rewardApy: 15,
      colateral: true,
    },
    {
      imgUrl:
        'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
      symbol: 'ETH',
      Icon: EtherSVG,
      name: 'Ethers',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      rewardApy: 15,
      colateral: true,
    },
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      symbol: 'USDC',
      Icon: USDCoinSVG,
      name: 'USD Coin',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      rewardApy: 15,
    },
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      symbol: 'USDT',
      Icon: TetherSVG,
      name: 'Tether',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      apr: 75,
      rewardApy: 15,
    },
  ],
  borrow: [
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      symbol: 'BTC',
      name: 'BitCoin',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      apr: 75,
      Icon: BitcoinSVG,
      rewardApy: 15,
      liquidity: 15,
    },
    {
      imgUrl:
        'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
      symbol: 'ETH',
      name: 'Ethers',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      Icon: EtherSVG,
      rewardApy: 15,
      liquidity: 15,
    },
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
      apr: 75,
      Icon: USDCoinSVG,
      rewardApy: 15,
      liquidity: 15,
    },
    {
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      symbol: 'USDT',
      name: 'Tether',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      apr: 75,
      Icon: TetherSVG,
      rewardApy: 15,
      liquidity: 15,
    },
  ],
};
