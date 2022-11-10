import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';

import { getFilterSwitchDefaultData } from '../../dinero-market.utils';
import { OnlyBorrowingFilterProps } from './borrow-filters.types';

const OnlyBorrowingFilter: FC<OnlyBorrowingFilterProps> = ({
  control,
  setValue,
}) => {
  const t = useTranslations();
  const onlyBorrowing = useWatch({ control, name: 'onlyBorrowing' });

  const SWITCH_ON_OFF_DATA = getFilterSwitchDefaultData(
    [t('common.off'), t('common.on')],
    setValue,
    'onlyBorrowing'
  );

  return (
    <Box
      width="auto"
      display="flex"
      gridColumn="1"
      flexDirection="column"
      my={['M', 'M', 'M', 'NONE']}
      alignItems={['center', 'flex-start']}
    >
      <Typography
        mb="M"
        as="label"
        fontSize="S"
        display="block"
        variant="normal"
        textAlign={['center', 'center', 'center', 'left']}
      >
        {t('dineroMarket.filterBorrowing')}
      </Typography>
      <Switch
        bg="background"
        options={SWITCH_ON_OFF_DATA}
        bgSelected="accentAlternative"
        defaultValue={onlyBorrowing ? t('common.on') : t('common.off')}
      />
    </Box>
  );
};

export default OnlyBorrowingFilter;
