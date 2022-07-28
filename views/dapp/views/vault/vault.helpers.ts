import { v4 } from 'uuid';

import { ERC_20_DATA } from '@/constants';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';

import { VaultData } from './vault.types';

const DATA: VaultData[] = [
  {
    id: v4(),
    vault: [
      ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.USDC],
      ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.BTC],
    ],
    vaultDetails: [{ title: 'Deposit', content: '0.00' }],
    caption: 'BUNNY Dividend',
    apy: '3.44%',
    earn: 'BNB',
    type: 'Investment',
    tvl: '$956,790.93',
    version: 1,
  },
  {
    id: v4(),
    vault: [ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.DNR]],
    vaultDetails: [
      { title: 'APR', content: '33%' },
      {
        title: 'Deposit',
        content: '0.0',
      },
      {
        title: 'Position',
        content: '2º',
      },
      {
        title: 'Profit',
        content: '0.0',
      },
    ],
    caption: 'DINERO',
    isAuto: true,
    apy: '3.44%',
    earn: 'DNR',
    type: 'Swap',
    tvl: '$96,790.93',
    version: 1,
  },
];

export default DATA;
