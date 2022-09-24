<<<<<<< HEAD
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
=======
import { FC, useState } from 'react';
>>>>>>> 0e0825b (🔥 feat: team section (#129))

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';

import { AutoFetchProps } from './settings.types';

<<<<<<< HEAD
const AutoFetch: FC<AutoFetchProps> = ({ setter, control }) => {
  const t = useTranslations();
  const autoFetch = useWatch({ control, name: 'autoFetch' });

  const handleAutoFetch = (value: boolean) => setter(value);

  return (
    <Box mx="M">
      <Typography variant="normal" fontSize="0.9rem" mb="M">
        {t('dexSwap.priceLabel')}
=======
const AutoFetch: FC<AutoFetchProps> = ({ setter, value }) => {
  const [autoFetch, setAutoFetch] = useState<boolean>(value);

  const handleAutoFetch = (value: boolean) => {
    setter(value);
    setAutoFetch(value);
  };
  return (
    <Box mx="M">
      <Typography variant="normal" fontSize="0.9rem" mb="M">
        Fetch price
>>>>>>> 0e0825b (🔥 feat: team section (#129))
      </Typography>
      <Switch
        defaultValue={autoFetch ? 'auto' : 'manual'}
        options={[
          { value: 'manual', onSelect: () => handleAutoFetch(false) },
          { value: 'auto', onSelect: () => handleAutoFetch(true) },
        ]}
      />
    </Box>
  );
};

export default AutoFetch;
