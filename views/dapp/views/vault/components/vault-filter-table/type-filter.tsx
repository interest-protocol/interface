import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';

import { getFilterSwitchDefaultData } from '../../vault.utils';
import { SwitchFilterProps } from './filter-table.types';

const TypeFilter: FC<SwitchFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const type = useWatch({ control, name: 'type' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.all'), 'LP'],
    setValue,
    'type'
  );

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        mb="M"
        fontSize="S"
        variant="normal"
        display="inline-block"
        textAlign={['center', 'center', 'center', 'left']}
        textTransform="capitalize"
      >
        {t('common.type')}
      </Typography>
      <Switch
        defaultValue={type ? 'LP' : t('common.all')}
        options={SWITCH_ON_OFF_DATA}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default TypeFilter;
