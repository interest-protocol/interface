import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Input, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import SwapSelectCurrency from '../dex/components/swap-select-currency';
import { FindPoolProps } from './dex-find-pool.types';

const FindPool: FC<FindPoolProps> = ({
  name,
  control,
  register,
  setValue,
  currencyChargerArgs,
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
        shieldProps={{
          my: 'M',
          height: '3rem',
          overflow: 'visible',
          borderColor: 'transparent',
        }}
        Suffix={
          <SwapSelectCurrency {...currencyChargerArgs} currentToken={address} />
        }
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

export default FindPool;
