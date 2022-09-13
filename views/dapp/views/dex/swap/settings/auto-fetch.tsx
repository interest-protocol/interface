import { FC, useState } from 'react';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';

import { AutoFetchProps } from './settings.types';

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
