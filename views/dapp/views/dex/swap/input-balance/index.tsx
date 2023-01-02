import { useTranslations } from 'next-intl';
import { ChangeEvent, FC } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { formatMoney, parseInputEventToNumberString } from '@/utils';

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
}) => {
  const t = useTranslations();

  const onFocus = (v: ChangeEvent<HTMLInputElement>) => {
    const value = v.target.value;

    +value === 0 && setValue?.(`${name}.value`, '');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Box
        py="S"
        px="M"
        mb="-1rem"
        bg="bottomBackground"
        borderRadius="M"
        position="relative"
      >
        <Typography fontSize="S" variant="normal" textTransform="capitalize">
          {t('common.balance')}:{' '}
          <Typography fontSize="S" variant="normal" fontWeight="bold" as="span">
            {formatMoney(balance)}
          </Typography>
        </Typography>
      </Box>
      <Input
        min="0"
        fontSize="L"
        type="string"
        placeholder="0.0"
        onFocus={onFocus}
        disabled={!!disabled}
        {...register(`${name}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            setValue?.(`${name}.value`, parseInputEventToNumberString(v, -1));

            handleSelectedByUser();
          },
        })}
        shieldProps={{
          px: 'S',
          py: 'L',
          my: 'M',
          width: '100%',
          display: 'grid',
          bg: 'background',
          borderRadius: '2.5rem',
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
              onClick={() => {
                setValue?.(`${name}.value`, max);
                handleSelectedByUser();
              }}
            >
              max
            </Button>
          )
        }
      />
    </Box>
  );
};

export default InputBalance;
