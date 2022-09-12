import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';
import { capitalize } from '@/utils';
import { getFilterSwitchDefaultData } from '@/views/dapp/views/earn/components/earn.data';

import { OnlyStakedFilterProps } from './earn-filters.types';

const OnlyStakedFilter: FC<OnlyStakedFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const onlyStaked = useWatch({ control, name: 'onlyStaked' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.off'), t('common.on')],
    setValue,
    'onlyStaked'
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
        {capitalize(t('earn.filterStaked'))}
      </Typography>
      <Switch
        defaultValue={onlyStaked ? t('common.on') : t('common.off')}
        options={SWITCH_ON_OFF_DATA}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default OnlyStakedFilter;
