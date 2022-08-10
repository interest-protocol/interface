import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';

import { getFilterSwitchDefaultData } from '../earn.data';
import { TypeFilterProps } from './earn-filters.types';

const TypeFilter: FC<TypeFilterProps> = ({ control, setValue }) => {
  const typeFilter = useWatch({ control, name: 'typeFilter' });

  const SWITCH_VOLATILE_DATA = getFilterSwitchDefaultData(
    ['volatile', 'stable'],
    setValue,
    'isVolatile'
  );

  return (
    <Box display="flex" flexDirection="column" my={['M', 'M', 'M', 'unset']}>
      <Typography fontSize="S" mb="M" variant="normal" display="inline-block">
        Type
      </Typography>
      <Switch
        defaultValue={typeFilter ? 'volatile' : 'stable'}
        options={SWITCH_VOLATILE_DATA}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default TypeFilter;
