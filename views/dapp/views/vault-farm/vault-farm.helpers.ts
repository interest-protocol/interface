import { Dispatch, SetStateAction } from 'react';

import { ISwitchOption } from '@/components/switch/switch.types';

type VaultFarmOperation = 'farm';

export const getSwitchDefaultData = (
  setBase: Dispatch<SetStateAction<string>>
): Record<VaultFarmOperation, [ISwitchOption, ISwitchOption]> => ({
  farm: [
    {
      value: 'Version 1',
      onSelect: () => setBase('Version 1'),
    },
    {
      value: 'Version 2',
      onSelect: () => setBase('Version 2'),
    },
  ],
});
