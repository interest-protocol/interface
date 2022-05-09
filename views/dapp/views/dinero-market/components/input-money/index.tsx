import { ChangeEvent, FC } from 'react';

import { Box, Input, Typography } from '@/elements';
import { parseToSafeStringNumber } from '@/utils';

import InputErrorMessage from './input-error';
import InputMaxButton from './input-max-button';
import { InputMoneyProps, TErrorMessageLabels } from './input-money.types';
import InputMoneySuffix from './input-money-suffix';

const InputMoney: FC<InputMoneyProps> = ({
  data,
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
  disabled,
}) => {
  const labels = name.split('.') as TErrorMessageLabels;
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
        type="string"
        placeholder={amount}
        disabled={disabled}
        {...register(name, {
          onChange: (v: ChangeEvent<HTMLInputElement>) =>
            setValue(name, parseToSafeStringNumber(v.target.value)),
        })}
        shieldProps={{
          p: 'S',
          my: 'M',
          height: '3rem',
          bg: 'background',
          borderRadius: 'M',
          border: '1px solid',
          borderColor: errors?.[labels[0]]?.[labels[1]]
            ? 'error'
            : 'transparent',
          hover: {
            borderColor: errors?.[labels[0]]?.[labels[1]]
              ? 'error'
              : 'accentBackground',
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
              data={data}
              setValue={setValue}
            />
            <Box
              px="L"
              display="flex"
              alignItems="center"
              borderRight="1px solid"
              borderColor="bottomBackground"
            >
              <CurrencySVG width="1rem" height="1rem" />
              <Typography as="span" variant="normal" ml="S">
                {currency}
              </Typography>
            </Box>
          </>
        }
      />
      <InputErrorMessage errors={errors} labels={labels} />
    </Box>
  );
};
export default InputMoney;
