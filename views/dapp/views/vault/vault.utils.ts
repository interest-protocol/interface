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
  search: string,
  type: boolean
): ReadonlyArray<VaultData> => {
  console.log(type + ' ::::: type filter');

  return search !== ''
    ? data.filter(
        (item) =>
          item.vault?.[0]?.symbol
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.vault?.[0]?.address
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.vault?.[0]?.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
      )
    : data;
};
