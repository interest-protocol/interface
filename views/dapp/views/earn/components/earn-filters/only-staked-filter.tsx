import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';
import { getFilterSwitchDefaultData } from '@/views/dapp/views/earn/components/earn.data';

import { OnlyStakedFilterProps } from './earn-filters.types';

const OnlyStakedFilter: FC<OnlyStakedFilterProps> = ({ control, setValue }) => {
  const onlyStaked = useWatch({ control, name: 'onlyStaked' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    ['on', 'off'],
    setValue,
    'onlyStaked'
  );

  return (
    <Box display="flex" flexDirection="column">
      <Typography fontSize="S" mb="M" variant="normal" display="inline-block">
        Staked only
      </Typography>
      <Switch
        defaultValue={onlyStaked ? 'on' : 'off'}
        options={SWITCH_ON_OFF_DATA.reverse()}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default OnlyStakedFilter;
