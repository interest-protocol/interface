import { ChangeEvent, FC } from 'react';

import { Box, Button, Input } from '@/elements';
import { formatMoney, parseToSafeStringNumber } from '@/utils';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  max,
  name,
  balance,
  register,
  setValue,
  disabled,
  currencySelector,
}) => (
  <>
    <Box>{formatMoney(+balance)}</Box>
    <Input
      min="0"
      fontSize="L"
      type="string"
      placeholder={'0'}
      disabled={!!disabled}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={name === 'tokenIn.value'}
      {...register(name, {
        onChange: (v: ChangeEvent<HTMLInputElement>) =>
          setValue?.(name, parseToSafeStringNumber(v.target.value)),
      })}
      shieldProps={{
        px: 'S',
        py: 'L',
        my: 'M',
        display: 'grid',
        borderRadius: 'M',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'transparent',
        gridTemplateColumns: '6.9rem 1fr auto',
        bg: disabled ? 'disabled' : 'background',
        hover: {
          borderColor: disabled ? 'disabled' : 'accentBackground',
        },
      }}
      Prefix={currencySelector}
      Suffix={
        !!max && (
          <Button
            px="M"
            fontSize="S"
            height="100%"
            variant="secondary"
            bg="bottomBackground"
            hover={{ bg: 'accent' }}
            active={{ bg: 'accentActive' }}
            onClick={() => setValue?.(name, max)}
          >
            max
          </Button>
        )
      }
    />
  </>
);

export default InputBalance;
