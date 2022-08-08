import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box } from '@/elements';

import { EarnFiltersProps } from '../../earn.types';
import { getFilterSwitchDefaultData } from '../earn.data';

const EarnFilters: FC<EarnFiltersProps> = ({ setValue, control }) => {
  const typeFarm = useWatch({ control, name: 'typeFarm' });

  const SWITCH_STABLE_VOLATILE_DATA = getFilterSwitchDefaultData(
    ['Volatile', 'Stable'],
    setValue
  );

  return (
    <Box
      p="L"
      my="L"
      borderRadius="L"
      bg="foreground"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flexWrap="wrap"
      >
        <Switch
          defaultValue={typeFarm}
          options={SWITCH_STABLE_VOLATILE_DATA}
          bg="background"
          bgSelected="accentAlternative"
        />
      </Box>
    </Box>
  );
};

export default EarnFilters;
