import { ChangeEvent, FC } from 'react';

import { Box, Button, Input } from '@/elements';
import { parseToSafeStringNumber } from '@/utils';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  max,
  name,
  register,
  setValue,
  disabled,
  currencyPrefix,
}) => (
  <Box mb="L">
    <Input
      disabled={disabled}
      type="string"
      placeholder={'0'}
      {...register(name, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          const value = v.target.value;

          setValue?.(
            name,
            parseToSafeStringNumber(
              isNaN(+value[value.length - 1]) && value[value.length - 1] !== '.'
                ? value.slice(0, value.length - 1)
                : value,
              max ? +max : undefined
            )
          );
          setValue('locked', false);
        },
      })}
      max={max}
      shieldProps={{
        p: 'S',
        my: 'M',
        height: '3rem',
        borderRadius: 'M',
        bg: 'background',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'transparent',
        opacity: disabled ? 0.7 : 1,
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
            disabled={disabled}
            active={{ bg: 'accentActive' }}
            bg={disabled ? 'disabled' : 'bottomBackground'}
            hover={{ bg: disabled ? 'disabled' : 'accent' }}
            onClick={() => {
              if (disabled) return;
              if (!setValue) return;
              setValue(name, max.toString());
              setValue('locked', false);
            }}
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

export default InputBalance;
