import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';

import { IVaultForm, VaultData } from './vault.types';

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IVaultForm>,
  name: 'type'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      setValue(name, false);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      setValue(name, true);
    },
  },
];

export const handleFilterVaults = (
  data: ReadonlyArray<VaultData>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type: boolean
) => data;
