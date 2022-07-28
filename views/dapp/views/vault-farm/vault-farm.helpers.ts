import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

type VaultFarmOperation = 'farm';

export const getSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<string>>
): Record<VaultFarmOperation, [ISwitchOption, ISwitchOption]> => ({
  farm: [
    {
      value: 'Stable',
      onSelect: () => setBase('Stable'),
    },
    {
      value: 'Unstable',
      onSelect: () => setBase('Unstable'),
    },
  ],
});
