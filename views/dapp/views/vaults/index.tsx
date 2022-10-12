import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { VaultTypes } from '@/constants';
import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { TimesSVG } from '@/svg';

import { VaultFilterTable, VaultHeader, VaultTable } from './components';
import { useGetVaultsSummary } from './vaults.hooks';
import { IVaultForm } from './vaults.types';
import { processVaultsSummaryData } from './vaults.utils';

const Vault: FC = () => {
  const t = useTranslations();
  const { chainId, account } = useIdAccount();
  const { error, data } = useGetVaultsSummary(chainId, account);

  const { register, control, setValue, getValues } = useForm<IVaultForm>({
    defaultValues: {
      search: '',
      type: VaultTypes.All,
      onlyDeposit: false,
    },
  });

  const processedData = useMemo(
    () => processVaultsSummaryData(chainId, data),
    [chainId, data]
  );

  if (error)
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mb="L"
          width="10rem"
          height="10rem"
          color="error"
          overflow="hidden"
          borderRadius="50%"
          border="0.3rem solid"
        >
          <TimesSVG width="100%" height="100%" />
        </Box>
        <Typography variant="title3">{t('error.generic')}</Typography>
      </Box>
    );

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
          <VaultFilterTable
            register={register}
            setValue={setValue}
            getValues={getValues}
            control={control}
          />
          <VaultTable
            data={processedData.data}
            control={control}
            loading={processedData.loading}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Vault;
