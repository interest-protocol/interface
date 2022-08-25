import { ChangeEvent, FC } from 'react';
import { v4 } from 'uuid';

import { Box, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { parseInputEventToNumberString } from '@/utils';

import InputErrorMessage from './input-error';
import InputMaxBalance from './input-max-balance';
import InputMaxButton from './input-max-button';
import { InputMoneyProps, TErrorMessageLabels } from './input-money.types';
import InputMoneySuffix from './input-money-suffix';

const InputMoney: FC<InputMoneyProps> = ({
  max,
  data,
  name,
  label,
  amount,
  errors,
  control,
  register,
  currency,
  setValue,
  disabled,
  isBorrow,
  amountUSD,
  currencyIcons,
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
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <InputMaxBalance
          max={max}
          data={data}
          control={control}
          isBorrow={!!isBorrow}
          isDNR={currency === TOKEN_SYMBOL.DNR}
        />
        <Input
          type="string"
          placeholder={amount}
          disabled={disabled}
          {...register(name, {
            onChange: (v: ChangeEvent<HTMLInputElement>) =>
              setValue(
                name,
                parseInputEventToNumberString(v, max ? +max : undefined)
              ),
          })}
          shieldProps={{
            p: 'S',
            my: 'M',
            width: '100%',
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
                data={data}
                control={control}
                isBorrow={isBorrow}
                setValue={setValue}
              />
              <Box
                px="L"
                display="flex"
                alignItems="center"
                borderRight="1px solid"
                borderColor="bottomBackground"
              >
                <Box display="inline-flex">
                  {currencyIcons.map(({ SVG, highZIndex }, index) => (
                    <Box
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-0.5rem' : 'NONE'}
                      zIndex={index == 0 && highZIndex ? 3 : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  ))}
                </Box>
                <Typography as="span" variant="normal" ml="S">
                  {currency}
                </Typography>
              </Box>
            </>
          }
        />
      </Box>
      <InputErrorMessage errors={errors} labels={labels} />
    </Box>
  );
};

export default InputMoney;
