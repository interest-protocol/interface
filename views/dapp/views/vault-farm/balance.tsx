import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';

import InputBalance from './input-balance';
import { HeaderProps, IVaultFarmForm } from './vault-farm.types';

const VaultFarmBalance: FC<HeaderProps> = ({ header }) => {
  const { register, setValue } = useForm<IVaultFarmForm>({
    defaultValues: {
      value: '',
    },
  });

  return (
    <Box p="0 2rem 0rem">
      <Box display="flex" justifyContent="space-between" color="textSecondary">
        {header == 'Unstable' && (
          <Typography
            variant="normal"
            fontSize={['0.65rem', '0.65rem', '0.85rem', '0.85rem']}
            fontWeight="500"
          >
            1% fee for unstaking within 3 days
          </Typography>
        )}
        <Typography
          variant="normal"
          fontSize={['0.65rem', '0.65rem', '0.85rem', '0.85rem']}
          fontWeight="500"
          color="textSecondary"
          ml="M"
          textAlign="right"
          width={header == 'Unstable' ? 'auto' : '100%'}
        >
          Balance: 0.000
        </Typography>
      </Box>
      <InputBalance
        name="value"
        max={10}
        register={register}
        setValue={setValue}
      />
      <Button variant="primary" width="100%" py="L" mb="1.5rem">
        Please switch to BSC
      </Button>
    </Box>
  );
};

export default VaultFarmBalance;
