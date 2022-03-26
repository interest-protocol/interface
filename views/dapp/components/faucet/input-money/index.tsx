import { FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { formatDollars } from '@/utils';

import { InputMoneyProps } from './input-money.types';

const InputMoney: FC<InputMoneyProps> = ({
  max,
  name,
  label,
  amount,
  register,
  setValue,
  amountUSD,
  currencyPrefix,
}) => (
  <Box mb="L">
    <Typography as="label" fontSize="S" variant="normal" display="inline-block">
      {label}:
    </Typography>
    <Input
      min="0"
      max={max}
      type="number"
      step="0.0001"
      placeholder={amount}
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
      Suffix={
        <Typography fontSize="S" variant="normal" color="textSecondary">
          {formatDollars(amountUSD)}
        </Typography>
      }
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
            onClick={() => setValue?.(name, +amount)}
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

export default InputMoney;
