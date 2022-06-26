import { BitcoinSVG, InterestTokenSVG } from '@/svg';

import { VaultData } from './vault.types';

const DATA: VaultData[] = [
  {
    items: {
      vaultName: [[BitcoinSVG], false, 'BUNNY Dividend', 'COIN'],
      apy: '3.44%',
      earn: 'BNB',
      platform: 'Coin',
      tvl: '$956,790.93',
    },
    handleClick: () => alert(123),
  },
  {
    items: {
      vaultName: [
        [InterestTokenSVG, BitcoinSVG],
        false,
        'BUNNY Dividend',
        'BUNNY',
      ],
      apy: '3.44%',
      earn: 'BNB',
      platform: 'Bunny',
      tvl: '$956,790.93',
    },
    handleClick: () => alert(123),
  },
  {
    items: {
      vaultName: [[InterestTokenSVG], false, 'BUNNY Dividend', 'APE'],
      apy: '3.44%',
      earn: 'BNB',
      platform: 'Ape',
      tvl: '$956,790.93',
    },
    handleClick: () => alert(123),
  },
];

export default DATA;
