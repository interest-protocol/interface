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
        title: 'vaultAddress.detail1',
        tip: 'vaultAddress.detail1Tip',
        content: '1,959.61 ' + TOKEN_SYMBOL.DNR,
      },
      {
        title: 'vaultAddress.detail2',
        tip: 'vaultAddress.detail2Tip',
        content: '59.61 ' + TOKEN_SYMBOL.BUSD,
      },
      {
        title: 'vaultAddress.detail3',
        tip: 'vaultAddress.detail3Tip',
        content: '1,959.61 / 15M',
      },
    ],
    caption: 'DINERO',
    apr: 'N/A',
    earn: 'N/A',
    deposit: '0.00',
    type: 'LP',
    tvl: '$96,790.93',
    version: 1,
  },
  {
    id: v4(),
    vault: [ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.BUSD]],
    vaultDetails: [
      {
        title: 'vaultAddress.detail1',
        tip: 'vaultAddress.detail1Tip',
        content: '3,959.61 ' + TOKEN_SYMBOL.BUSD,
      },
      {
        title: 'vaultAddress.detail2',
        tip: 'vaultAddress.detail2Tip',
        content: '359.61 ' + TOKEN_SYMBOL.DNR,
      },
      {
        title: 'vaultAddress.detail3',
        tip: 'vaultAddress.detail3Tip',
        content: '3,959.61 / 55M',
      },
    ],
    caption: 'BUSD',
    apr: 'N/A',
    earn: 'N/A',
    deposit: '0.00',
    type: 'LP',
    tvl: '$6,190.93',
    version: 1,
  },
];

export default DATA;
