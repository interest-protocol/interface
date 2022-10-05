import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box } from '@/elements';

import { VaultFilterTable, VaultHeader, VaultTable } from './components';
import DATA from './vault.helpers';
import { IVaultForm } from './vault.types';

const Vault: FC = () => {
  const [loading, setLoading] = useState(true);
  const { register, control, setValue, getValues } = useForm<IVaultForm>({
    defaultValues: {
      search: '',
      type: false,
    },
  });

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setLoading(false);
      }, Math.floor(Math.random() * 3000));
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      width={['100%', '100%', '100%', '60rem']}
      mx="auto"
    >
      <Container
        dapp
        width="100%"
        py="XL"
        display="flex"
        flexDirection="column"
        justifyContent={['center', 'flex-start']}
      >
        <VaultHeader size={DATA.length} />
        <VaultFilterTable
          register={register}
          setValue={setValue}
          getValues={getValues}
          control={control}
        />
        <Box width="100%">
          <VaultTable data={DATA} control={control} loading={loading} />
        </Box>
      </Container>
    </Box>
  );
};

export default Vault;
