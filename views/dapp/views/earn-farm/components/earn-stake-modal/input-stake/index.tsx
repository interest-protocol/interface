import { ChangeEvent, FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { parseToSafeStringNumber } from '@/utils';

import { InputStakeProps } from './input-stake.types';

const InputStake: FC<InputStakeProps> = ({
  label,
  amount,
  register,
  setValue,
  currencyPrefix,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      type="string"
      {...register('value', {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          const value = v.target.value;

          setValue?.(
            'value',
            parseToSafeStringNumber(
              isNaN(+value[value.length - 1]) && value[value.length - 1] !== '.'
                ? value.slice(0, value.length - 1)
                : value,
              amount ? amount : undefined
            )
          );
        },
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
            type="button"
            variant="secondary"
            bg="bottomBackground"
            hover={{ bg: 'accent' }}
            active={{ bg: 'accentActive' }}
            onClick={() =>
              setValue(
                'value',
                amount.toLocaleString('fullwide', {
                  useGrouping: false,
                  maximumSignificantDigits: 6,
                })
              )
            }
          >
            max
          </Button>
          <Box
            px="L"
            display="flex"
            alignItems="center"
            borderRight="1px solid"
            borderColor="bottomBackground"
          >
            {currencyPrefix}
          </Box>
        </>
      }
    />
  </Box>
);

export default InputStake;
