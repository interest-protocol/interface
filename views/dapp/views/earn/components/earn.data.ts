import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

export const getHeaderSwitchDefaultData = (
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

export const getFilterSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<boolean>>,
  values: ReadonlyArray<string>
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      setBase(true);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      setBase(false);
    },
  },
];
