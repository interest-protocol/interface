import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';

import { IEarnForm } from '../earn.types';

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
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IEarnForm>,
  name: 'isStaked' | 'isLive'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      setValue(name, true);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      setValue(name, false);
    },
  },
];
