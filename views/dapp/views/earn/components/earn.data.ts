import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

export const getSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<boolean>>,
  push: (T: any) => Promise<boolean>
): [ISwitchOption, ISwitchOption] => [
  {
    value: 'farms',
    onSelect: () => {
      setBase(true);
      push('/dapp/earn/farms');
    },
  },
  {
    value: 'pool',
    onSelect: () => {
      setBase(false);
      push('/dapp/earn/pool');
    },
  },
];
