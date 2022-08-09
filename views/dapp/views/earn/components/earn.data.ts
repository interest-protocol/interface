import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';

import { IEarnForm } from '../earn.types';

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IEarnForm>,
  name: 'isStaked' | 'isLive' | 'isVolatile'
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
