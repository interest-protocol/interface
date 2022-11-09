import { useTranslations } from 'next-intl';
import { FC, useEffect } from 'react';
import { event } from 'react-ga';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Typography } from '@/elements';

import { getFilterSwitchDefaultData } from '../../vaults.utils';
import { FilterProps } from './filter-table.types';

const OnlyDeposit: FC<FilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const onlyDeposit = useWatch({ control, name: 'onlyDeposit' });
  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.off'), t('common.on')],
    setValue,
    'onlyDeposit'
  );
  const trackGAFilter = () =>
    event({
      label: 'onlyDeposit = ' + onlyDeposit ? 'on' : 'off',
      action: GAAction.Switch,
      category: GACategory.VaultFilters,
    });
  useEffect(() => trackGAFilter(), [onlyDeposit]);

  return (
    <Box display="flex" flexDirection="column" my={['M', 'M', 'M', 'NONE']}>
      <Typography
        mb="M"
        fontSize="S"
        variant="normal"
        display="inline-block"
        textAlign={['center', 'center', 'center', 'left']}
      >
        {t('vaults.depositFilterLabel')}
      </Typography>
      <Switch
        defaultValue={onlyDeposit ? t('common.on') : t('common.off')}
        options={SWITCH_ON_OFF_DATA}
        bg="background"
        bgSelected="accentAlternative"
      />
    </Box>
  );
};

export default OnlyDeposit;
