import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { capitalize } from '@/utils';

import InputBalance from './input-balance';
import { IVaultForm, VaultDetailBalanceProps } from './vault-details.types';

const VaultDetailsBalance: FC<VaultDetailBalanceProps> = ({
  symbol,
  address,
  balance,
}) => {
  const t = useTranslations();
  const { register, setValue } = useForm<IVaultForm>({
    defaultValues: {
      value: '',
    },
  });

  return (
    <Box p="0 2rem 0rem">
      <Box display="flex" justifyContent="space-between" color="textSecondary">
        <Typography
          variant="normal"
          fontSize={['0.65rem', '0.65rem', '0.85rem', '0.85rem']}
          fontWeight="500"
          color="textSecondary"
          ml="M"
          textAlign="right"
          width="100%"
        >
          {capitalize(t('common.balance'))} : {balance}
        </Typography>
      </Box>
      <InputBalance
        name="value"
        max={10}
        register={register}
        setValue={setValue}
        symbol={symbol}
        address={address}
      />
      <Button variant="primary" width="100%" py="L" mb="1.5rem">
        {capitalize(t('common.approve', { isLoading: 0 }))}
      </Button>
    </Box>
  );
};

export default VaultDetailsBalance;
