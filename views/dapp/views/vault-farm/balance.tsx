import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';

import InputBalance from './input-balance';
import { IVaultFarmForm } from './vault-farm.types';

const VaultFarmBalance: FC = () => {
  const { register, setValue } = useForm<IVaultFarmForm>({
    defaultValues: {
      value: '',
    },
  });

  return (
    <Box p="0 2rem 0rem">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="normal" fontSize="1rem" fontWeight="500">
          1% fee for unstaking within 3 days
        </Typography>
        <Typography
          variant="normal"
          fontSize="1rem"
          fontWeight="500"
          color="textSecondary"
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
