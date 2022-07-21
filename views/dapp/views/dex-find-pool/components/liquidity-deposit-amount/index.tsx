import { ChangeEvent, FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Input, Typography } from '@/elements';
import { formatMoney, parseToSafeStringNumber } from '@/utils';

import { LiquidityDepositAmountProps } from '../../../dex/pool/pool.types';

const LiquidityDepositAmount: FC<LiquidityDepositAmountProps> = ({
  name,
  control,
  register,
  setValue,
  CurrencyChanger,
}) => {
  const address = useWatch({ control, name: `${name}.address` });

  const balance = Math.random() * 9782;

  return (
    <Box
      py="M"
      my="M"
      bg="background"
      borderRadius="1.1rem"
      border="0.02rem solid"
      opacity={address ? 1 : 0.7}
      borderColor="bottomBackground"
      hover={{
        borderColor: 'textSoft',
      }}
    >
      <Input
        min="0"
        type="string"
        fontSize="XL"
        placeholder={'0.0'}
        disabled={address ? false : true}
        {...register(`${name}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) =>
            setValue?.(
              `${name}.value`,
              parseToSafeStringNumber(v.target.value, balance)
            ),
        })}
        shieldProps={{
          my: 'M',
          height: '3rem',
          overflow: 'visible',
          borderColor: 'transparent',
        }}
        Suffix={CurrencyChanger}
      />
      <Box
        mx="L"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          height="2.4rem"
          variant="secondary"
          disabled={address ? false : true}
          onClick={() => setValue(`${name}.value`, String(balance))}
        >
          max
        </Button>
        <Typography
          variant="normal"
          textAlign="end"
          color="textSecondary"
          fontSize="0.9rem"
        >
          Balance: {formatMoney(balance)}
        </Typography>
      </Box>
    </Box>
  );
};

export default LiquidityDepositAmount;
