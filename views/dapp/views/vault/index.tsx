import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box } from '@/elements';
import { useIdAccount } from '@/hooks';

import { VaultFilterTable, VaultHeader, VaultTable } from './components';
import { useGetVaultsSummary } from './vault.hooks';
import { IVaultForm } from './vault.types';
import { processVaultsSummaryData } from './vault.utils';

const Vault: FC = () => {
  const { chainId, account } = useIdAccount();
  const { error, data } = useGetVaultsSummary(chainId, account);

  const { register, control, setValue, getValues } = useForm<IVaultForm>({
    defaultValues: {
      search: '',
      type: false,
      onlyDeposit: false,
    },
  });

  const processedData = useMemo(
    () => processVaultsSummaryData(chainId, data),
    [chainId, data]
  );

  if (error) return <div>Error</div>;

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
        <VaultHeader size={processedData.data.length} />
        <Box width="100%">
          {/*<VaultFilterTable*/}
          {/*  register={register}*/}
          {/*  setValue={setValue}*/}
          {/*  getValues={getValues}*/}
          {/*  control={control}*/}
          {/*/>*/}
          {/*<VaultTable*/}
          {/*  data={processedData.data}*/}
          {/*  control={control}*/}
          {/*  loading={processedData.loading}*/}
          {/*/>*/}
        </Box>
      </Container>
    </Box>
  );
};

export default Vault;
