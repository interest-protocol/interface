import { FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  register,
  setValue,
  max,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      min="0"
      type="number"
      step="0.0001"
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
        <>
          <Button
            px="M"
            fontSize="S"
            height="100%"
            variant="secondary"
            bg="bottomBackground"
            hover={{ bg: 'accent' }}
            active={{ bg: 'accentActive' }}
            onClick={() => {
              if (!setValue) return;
              setValue('value', max);
            }}
          >
            Safe max
          </Button>
        </>
      }
    />
  </Box>
);

export default InputBalance;
