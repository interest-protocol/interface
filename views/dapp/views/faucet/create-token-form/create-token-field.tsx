import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import { CreateTokenFieldProps } from './create-token-form.types';

const CreateTokenField: FC<CreateTokenFieldProps> = ({
  name,
  label,
  register,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      placeholder={`Type ${label}`}
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
    />
  </Box>
);

export default CreateTokenField;
