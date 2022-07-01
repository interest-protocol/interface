import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import { FieldProps } from './settings.types';

const Field: FC<FieldProps> = ({
  label,
  name,
  prefix,
  register,
  step,
  suffix,
}) => {
  return (
    <Box mt="L">
      <Typography variant="normal" fontSize="0.9rem">
        {label}
      </Typography>
      <Input
        min="0"
        type="number"
        step={step}
        placeholder={'25.00'}
        {...register(name)}
        max="100"
        textAlign="right"
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
        Prefix={prefix}
        Suffix={suffix}
      />
    </Box>
  );
};

export default Field;
