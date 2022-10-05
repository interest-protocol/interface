import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box } from '@/elements';

import { getFilterSwitchDefaultData } from '../../vault.utils';
import { LPFilterProps } from './filter-table.types';

const TypeFilter: FC<LPFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const type = useWatch({ control, name: 'type' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.all'), 'LP'],
    setValue,
    'type'
  );

  return (
    <Box display="inline-block" flexDirection="column">
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
