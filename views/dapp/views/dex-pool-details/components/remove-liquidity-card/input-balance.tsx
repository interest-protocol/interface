import { ChangeEvent, FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Input, Typography } from '@/elements';
import {
  formatMoney,
  numberToString,
  parseInputEventToNumberString,
} from '@/utils';

import { InputBalanceProps } from './remove-liquidity-card.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  balance,
  register,
  setValue,
  disabled: _disabled,
  currencyPrefix,
  control,
}) => {
  const onFocus = (v: ChangeEvent<HTMLInputElement>) => {
    const value = v.target.value;

    value === '0.0' && setValue?.(name, '');
  };

  const loading = useWatch({ control, name: 'loading' });

  const disabled = _disabled || loading;

  return (
    <Box display="flex" flexDirection="column-reverse" alignItems="flex-end">
      <Input
        type="text"
        max={numberToString(balance)}
        placeholder="0.0"
        onFocus={onFocus}
        disabled={disabled}
        {...register(name, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            setValue?.(
              name,
              parseInputEventToNumberString(
                v,
                balance ? +numberToString(balance) : undefined
              )
            );
          },
        })}
        shieldProps={{
          p: 'S',
          my: 'M',
          width: '100%',
          height: '3rem',
          bg: 'background',
          borderRadius: 'M',
          position: 'static',
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'transparent',
          opacity: disabled ? 0.7 : 1,
          hover: {
            borderColor: 'accentBackground',
          },
        }}
        Prefix={
          <>
            <Button
              px="M"
              fontSize="S"
              height="100%"
              variant="secondary"
              disabled={disabled}
              active={{ bg: 'accentActive' }}
              bg={disabled ? 'disabled' : 'bottomBackground'}
              hover={{ bg: disabled ? 'disabled' : 'accent' }}
              onClick={() => {
                if (disabled) return;
                if (!setValue) return;
                setValue(name, numberToString(balance));
              }}
            >
              max
            </Button>
            <Box
              px="L"
              display="flex"
              maxHeight="1rem"
              alignItems="center"
              borderRight="1px solid"
              borderColor="bottomBackground"
            >
              {currencyPrefix}
            </Box>
          </>
        }
      />
      <Box
        py="S"
        px="M"
        mb="-1rem"
        borderRadius="M"
        position="relative"
        bg="bottomBackground"
      >
        <Typography fontSize="S" variant="normal">
          Balance:{' '}
          <Typography fontSize="S" variant="normal" fontWeight="bold" as="span">
            {formatMoney(balance)}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default InputBalance;
