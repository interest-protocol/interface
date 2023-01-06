import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  register,
  currencyPrefix,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      min="0"
      type="text"
      step="0.0001"
      disabled={true}
      placeholder={'0'}
      {...register(name)}
      shieldProps={{
        p: 'S',
        my: 'M',
        height: '3rem',
        bg: 'background',
        borderRadius: 'M',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'transparent',
        hover: {
          borderColor: 'accentBackground',
        },
      }}
      Prefix={
        <Box
          display="flex"
          alignItems="center"
          borderRight="1px solid"
          borderColor="bottomBackground"
        >
          {currencyPrefix}
        </Box>
      }
    />
  </Box>
);

export default InputBalance;
