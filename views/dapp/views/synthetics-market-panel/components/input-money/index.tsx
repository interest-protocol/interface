import { useTranslations } from 'next-intl';
import { ChangeEvent, FC } from 'react';
import { v4 } from 'uuid';

import { Box, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { capitalize, parseInputEventToNumberString } from '@/utils';

import InputErrorMessage from './input-error';
import InputMaxButton from './input-max-button';
import InputMaxTag from './input-max-tag';
import { InputMoneyProps, TErrorMessageLabels } from './input-money.types';
import InputSuffix from './input-suffix';

const COLLATERAL_SYMBOLS = {
  [TOKEN_SYMBOL.ETH]: true,
  [TOKEN_SYMBOL.BUSD]: true,
} as Record<string, boolean>;

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
  isMint,
  price,
  currencyIcons,
}) => {
  const t = useTranslations();
  const labels = name.split('.') as TErrorMessageLabels;

  return (
    <Box mb="L">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        {capitalize(t(label))}:
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <InputMaxTag
          max={max}
          data={data}
          control={control}
          isMint={!!isMint}
          isCollateral={COLLATERAL_SYMBOLS[currency] || false}
        />
        <Input
          type="string"
          disabled={disabled}
          placeholder={amount}
          {...register(name, {
            onChange: (v: ChangeEvent<HTMLInputElement>) =>
              setValue(name, parseInputEventToNumberString(v)),
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
            <InputSuffix
              name={name}
              control={control}
              price={price}
              isStable={data.isCollateralStable}
            />
          }
          Prefix={
            <>
              <InputMaxButton
                max={max}
                name={name}
                data={data}
                control={control}
                isMint={isMint}
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
                      <SVG width="100%" maxHeight="1.6rem" maxWidth="1.6rem" />
                    </Box>
                  ))}
                </Box>
                <Typography
                  ml="S"
                  as="span"
                  variant="normal"
                  display={['none', 'inline']}
                >
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
