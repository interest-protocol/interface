import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';
import { getFilterSwitchDefaultData } from '@/views/dapp/views/earn/components/earn.data';

import { OnlyFinishedFilterProps } from './earn-filters.types';

const OnlyFinishedFilter: FC<OnlyFinishedFilterProps> = ({
  control,
  setValue,
}) => {
  const onlyFinished = useWatch({ control, name: 'onlyFinished' });
  const SWITCH_ONLY_FINISHED_DATA = getFilterSwitchDefaultData(
    ['live', 'finished'],
    setValue,
    'onlyFinished'
  );

  return (
    <Box display="flex" flexDirection="column" my={['M', 'M', 'M', 'NONE']}>
      <Typography
        mb="M"
        fontSize="S"
        variant="normal"
        display="inline-block"
        textAlign={['center', 'center', 'center', 'left']}
      >
        Status
      </Typography>
      <Switch
        defaultValue={onlyFinished ? 'finished' : 'live'}
        options={SWITCH_ONLY_FINISHED_DATA}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default OnlyFinishedFilter;
