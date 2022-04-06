import { FC } from 'react';

import { TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { Box, Button, Input, Typography } from '@/elements';

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
      min="0"
      type="number"
      step="0.0001"
      placeholder={'0'}
      {...register(name)}
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
              setValue(name, CURRENCY_MAX[currency]);
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
