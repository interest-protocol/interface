import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import InputMaxButton from './input-max-button';
import { InputMoneyProps } from './input-money.types';
import InputMoneySuffix from './input-money-suffix';

const InputMoney: FC<InputMoneyProps> = ({
  max,
  name,
  label,
  amount,
  control,
  register,
  currency,
  setValue,
  amountUSD,
  CurrencySVG,
}) => {
  return (
    <Box mb="L">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
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
          border: '1px solid',
          borderColor: 'transparent',
          hover: {
            borderColor: 'accentBackground',
          },
        }}
        Suffix={
          <InputMoneySuffix
            name={name}
            control={control}
            amountUSD={amountUSD}
          />
        }
        Prefix={
          <>
            <InputMaxButton max={max} name={name} setValue={setValue} />
            <Box
              px="L"
              display="flex"
              alignItems="center"
              borderRight="1px solid"
              borderColor="bottomBackground"
            >
              <CurrencySVG width="1rem" />
              <Typography as="span" variant="normal" ml="S">
                {currency}
              </Typography>
            </Box>
          </>
        }
      />
    </Box>
  );
};
export default InputMoney;
