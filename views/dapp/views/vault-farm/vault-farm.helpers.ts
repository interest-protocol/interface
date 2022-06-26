import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

type VaultFarmOperation = 'farm';

export const getSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<string>>
): Record<VaultFarmOperation, [ISwitchOption, ISwitchOption]> => ({
  farm: [
    {
      value: 'Stake',
      onSelect: () => setBase('Stake'),
    },
    {
      value: 'Unstake',
      onSelect: () => setBase('Unstake'),
    },
  ],
});
