import { ChangeEvent, FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { parseInputEventToNumberString } from '@/utils';

import { CreateTokenSupplyFieldProps } from './create-token-form.types';

const CURRENCY_MAX = 10000;

const CreateTokenSupplyField: FC<CreateTokenSupplyFieldProps> = ({
  label,
  register,
  setValue,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      type="string"
      placeholder={'0'}
      {...register('amount', {
        onChange: (v: ChangeEvent<HTMLInputElement>) =>
          setValue?.('amount', parseInputEventToNumberString(v)),
      })}
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
              setValue('amount', CURRENCY_MAX.toString());
            }}
          >
            max
          </Button>
        </>
      }
    />
  </Box>
);

export default CreateTokenSupplyField;
