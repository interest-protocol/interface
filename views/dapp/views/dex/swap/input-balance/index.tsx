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
  handleSelectedByUser,
}) => (
  <>
    <Box>{formatMoney(balance)}</Box>
    <Input
      min="0"
      fontSize="L"
      type="string"
      placeholder={'0'}
      disabled={!!disabled}
      {...register(`${name}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          const value = v.target.value;

          setValue?.(
            `${name}.value`,
            parseToSafeStringNumber(
              isNaN(+value[value.length - 1])
                ? value.slice(0, value.length - 1)
                : value
            )
          );

          handleSelectedByUser();
        },
      })}
      shieldProps={{
        px: 'S',
        py: 'L',
        my: 'M',
        display: 'grid',
        bg: 'background',
        borderRadius: 'M',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'transparent',
        gridTemplateColumns: '6.9rem 1fr auto',
        hover: {
          borderColor: 'accentBackground',
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
            onClick={() => setValue?.(`${name}.value`, max)}
          >
            max
          </Button>
        )
      }
    />
  </>
);

export default InputBalance;
