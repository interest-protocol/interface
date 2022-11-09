import { useTranslations } from 'next-intl';
import { FC, useEffect } from 'react';
import { event } from 'react-ga';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Typography } from '@/elements';
import { getFilterSwitchDefaultData } from '@/views/dapp/views/farms/components/farms.data';

import { OnlyStakedFilterProps } from './farms-filters.types';

const OnlyStakedFilter: FC<OnlyStakedFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const onlyStaked = useWatch({ control, name: 'onlyStaked' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.off'), t('common.on')],
    setValue,
    'onlyStaked'
  );
  const trackGAFilter = () =>
    event({
      label: 'OnlyStaked = ' + onlyStaked ? 'on' : 'off',
      action: GAAction.Switch,
      category: GACategory.FarmFilters,
    });
  useEffect(() => trackGAFilter(), [onlyStaked]);

  return (
    <Box display="flex" flexDirection="column" my={['M', 'M', 'M', 'NONE']}>
      <Typography
        mb="M"
        fontSize="S"
        variant="normal"
        display="inline-block"
        textAlign={['center', 'center', 'center', 'left']}
      >
        {t('farms.filterStaked')}
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
