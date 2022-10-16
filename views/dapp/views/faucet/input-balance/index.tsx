import { getAddress } from 'ethers/lib/utils';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Input, Typography } from '@/elements';

import { FAUCET_TOKEN_MAX_AMOUNT } from '../faucet.data';
import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  register,
  setValue,
  currencyPrefix,
  chainId,
  control,
}) => {
  const t = useTranslations();
  const token = useWatch({ control, name: 'token' });

  return (
    <Box mb="L">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        {label + t('special.colon')}
      </Typography>
      <Input
        min="0"
        type="number"
        step="0.0001"
        placeholder={'0'}
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
              onClick={() => {
                if (!setValue) return;
                setValue(
                  name,
                  FAUCET_TOKEN_MAX_AMOUNT[chainId][getAddress(token)]
                );
              }}
            >
              {t('common.max')}
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
};

export default InputBalance;
