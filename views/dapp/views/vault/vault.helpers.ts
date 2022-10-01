import { v4 } from 'uuid';

import { ERC_20_DATA } from '@/constants';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';

import { VaultData } from './vault.types';

const DATA: VaultData[] = [
  {
    id: v4(),
    vault: [ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.DNR]],
    vaultDetails: [
      {
        title: 'Deposit Collateral',
        tip: 'Amount of collateral available in the vault',
        content: '1,959.61',
      },
      {
        title: 'Dinero receive per deposit',
        tip: 'Amount of money received',
        content: '59.61',
      },
      {
        title: 'Maximum vault amount',
        content: '1,959.61 / 15M',
      },
    ],
    caption: 'DINERO',
    apy: 'N/A',
    earn: 'N/A',
    type: 'LP',
    tvl: '$96,790.93',
    version: 1,
  },
  {
    id: v4(),
    vault: [ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.USDC]],
    vaultDetails: [
      {
        title: 'Deposit Collateral',
        tip: 'Amount of collateral available in the vault',
        content: '3,959.61',
      },
      {
        title: 'Dinero received per deposit',
        tip: 'Amount of money received',
        content: '359.61',
      },
      {
        title: 'Maximum vault amount',
        content: '3,959.61 / 55M',
      },
    ],
    caption: 'BNB',
    apy: 'N/A',
    earn: 'N/A',
    type: 'LP',
    tvl: '$6,190.93',
    version: 1,
  },
];

export default DATA;
