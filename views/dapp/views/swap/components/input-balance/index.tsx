import { FC } from 'react';

import { Button, Input } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { InputBalanceProps } from './input-balance.types';

const CURRENCY_MAX = {
  [TOKEN_SYMBOL.BTC]: 10,
  [TOKEN_SYMBOL.DNR]: 10000,
} as Record<TOKEN_SYMBOL, number>;

const InputBalance: FC<InputBalanceProps> = ({
  name,
  getValues,
  register,
  setValue,
  suffix,
  disabled,
}) => (
  <Input
    disabled={disabled || false}
    min="0"
    type="number"
    step="0.0001"
    placeholder={'0'}
    {...register(name)}
    max={CURRENCY_MAX[getValues().currency as TOKEN_SYMBOL]}
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
    Prefix={suffix}
    Suffix={
      !disabled && (
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
            setValue(name, CURRENCY_MAX[currency as TOKEN_SYMBOL]);
          }}
        >
          max
        </Button>
      )
    }
  />
);

export default InputBalance;
