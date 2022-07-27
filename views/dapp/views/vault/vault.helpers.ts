import { BitcoinSVG, InterestTokenSVG } from '@/svg';

import { VaultData } from './vault.types';

const DATA: VaultData[] = [
  {
    items: {
      id: 'COIN-1',
      vaultName: [[BitcoinSVG], false, 'BUNNY Dividend', 'COIN'],
      apy: '3.44%',
      earn: 'BNB',
      type: 'Investment',
      tvl: '$956,790.93',
    },
  },
  {
    items: {
      id: 'BUNNY-2',
      vaultName: [
        [InterestTokenSVG, BitcoinSVG],
        false,
        'BUNNY Dividend',
        'BUNNY',
      ],
      apy: '3.44%',
      earn: 'BNB',
      type: 'Swap',
      tvl: '$956,790.93',
    },
  },
  {
    items: {
      id: 'APE-1',
      vaultName: [[InterestTokenSVG], false, 'BUNNY Dividend', 'APE'],
      apy: '3.44%',
      earn: 'BNB',
      type: 'Swap',
      tvl: '$956,790.93',
    },
  },
];

export default DATA;
