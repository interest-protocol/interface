import { FC } from 'react';

import { Button, Input } from '@/elements';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  register,
  setValue,
  disabled,
  currencySelector,
}) => (
  <Input
    min="0"
    max={1000}
    fontSize="L"
    type="number"
    step="0.0001"
    placeholder={'0'}
    disabled={disabled || false}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={name === 'origin.value'}
    {...register(name)}
    shieldProps={{
      px: 'S',
      py: 'L',
      my: 'M',
      bg: 'background',
      borderRadius: 'M',
      overflow: 'visible',
      border: '1px solid',
      borderColor: 'transparent',
      hover: {
        borderColor: 'accentBackground',
      },
    }}
    Prefix={currencySelector}
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
            setValue(name, 100);
          }}
        >
          max
        </Button>
      )
    }
  />
);

export default InputBalance;
