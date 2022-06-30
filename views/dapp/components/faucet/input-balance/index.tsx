import { ChangeEvent, FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { parseToSafeStringNumber } from '@/utils';

import { InputBalanceProps } from './input-balance.types';

const CURRENCY_MAX = {
  [TOKEN_SYMBOL.BTC]: 10,
  [TOKEN_SYMBOL.DNR]: 10000,
} as Record<TOKEN_SYMBOL, number>;

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  getValues,
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
      placeholder={'0'}
      {...register(name, {
        onChange: (v: ChangeEvent<HTMLInputElement>) =>
          setValue?.(
            name,
            parseToSafeStringNumber(
              v.target.value,
              CURRENCY_MAX[getValues().currency]
            )
          ),
      })}
      max={CURRENCY_MAX[getValues().currency]}
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
              const currency = getValues('currency');
              setValue(name, CURRENCY_MAX[currency].toString());
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
