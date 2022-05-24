import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

import { MAILMarketPoolOperation } from '../../../mail-market-pool.types';

export const getSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<boolean>>
): Record<MAILMarketPoolOperation, [ISwitchOption, ISwitchOption]> => ({
  supply: [
    {
      value: 'supply',
      onSelect: () => setBase(true),
    },
    {
      value: 'redeem',
      onSelect: () => setBase(false),
    },
  ],
  borrow: [
    {
      value: 'borrow',
      onSelect: () => setBase(true),
    },
    {
      value: 'repay',
      onSelect: () => setBase(false),
    },
  ],
});
