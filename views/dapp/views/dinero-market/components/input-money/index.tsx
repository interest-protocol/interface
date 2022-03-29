import { FC, useMemo } from 'react';

import { Box, Input, Typography } from '@/elements';

import InputMaxButton from './input-max-button';
import { InputMoneyProps } from './input-money.types';
import InputMoneySuffix from './input-money-suffix';

const InputMoney: FC<InputMoneyProps> = ({
  max,
  name,
  label,
  amount,
  errors,
  control,
  register,
  currency,
  setValue,
  amountUSD,
  CurrencySVG,
  currencyDiff,
}) => {
  const labels = name.split('.');

  const error = useMemo(
    () =>
      errors?.[labels[0] as 'borrow' | 'repay']?.[
        labels[1] as 'collateral' | 'loan'
      ],
    [errors]
  );

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
        type="number"
        placeholder={amount}
        {...register(name)}
        shieldProps={{
          p: 'S',
          my: 'M',
          height: '3rem',
          bg: 'background',
          borderRadius: 'M',
          border: '1px solid',
          borderColor: error ? 'error' : 'transparent',
          hover: {
            borderColor: error ? 'error' : 'accentBackground',
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
            <InputMaxButton
              max={max}
              name={name}
              control={control}
              setValue={setValue}
              currencyDiff={currencyDiff!}
            />
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
      {error && (
        <Typography
          variant="normal"
          textAlign="right"
          fontSize="S"
          color="error"
        >
          {error?.message}
        </Typography>
      )}
    </Box>
  );
};
export default InputMoney;
