import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Container } from '@/components';
import { Box } from '@/elements';

import { VaultFilterTable, VaultHeader, VaultTable } from './components';
import ZAP from './components/zap';
import DATA from './vault.helpers';

const Vault: FC = () => {
  const [loading, setLoading] = useState(true);
  const [whoIsSelected, setWhoIsSelected] = useState('All');
  const { register, control, setValue } = useForm();

  const search = useWatch({ control, name: 'search.value' });
  console.log(search);

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
    >
      <Container
        dapp
        py="XL"
        px="NONE"
        width="55%"
        display="flex"
        flexDirection="column"
        justifyContent={['center', 'flex-start']}
      >
        <VaultHeader size={DATA.length} />
        <VaultFilterTable
          register={register}
          setValue={setValue}
          state={whoIsSelected}
          setState={setWhoIsSelected}
        />
        <Box width="100%">
          <VaultTable
            data={
              whoIsSelected == 'All'
                ? DATA
                : DATA.filter((item) => item.type == whoIsSelected)
            }
            loading={loading}
          />
        </Box>
      </Container>
      <ZAP />
    </Box>
  );
};

export default Vault;
