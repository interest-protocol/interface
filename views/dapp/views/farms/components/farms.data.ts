import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { logEvent } from '@/utils/analytics';

import { IFarmsForm } from '../farms.types';

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IFarmsForm>,
  name: 'onlyStaked' | 'onlyFinished'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      logEvent(GACategory.FarmFilters, GAAction.Switch, `${name} = off`);
      setValue(name, false);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      logEvent(GACategory.FarmFilters, GAAction.Switch, `${name} = on`);
      setValue(name, true);
    },
  },
];
