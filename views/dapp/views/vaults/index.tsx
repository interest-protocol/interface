import { useTranslations } from 'next-intl';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { VaultTypes } from '@/constants';
import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import useEventListener from '@/hooks/use-event-listener';
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

  const [isDesktop, setDesktop] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsDesktop = window.matchMedia('(min-width: 64em)').matches;
    setDesktop(mediaIsDesktop);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

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
          <TimesSVG
            width="100%"
            height="100%"
            maxHeight="10rem"
            maxWidth="10rem"
          />
        </Box>
        <Typography variant="title3">{t('error.generic')}</Typography>
      </Box>
    );

  return (
    <Box
      mx="auto"
      height="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      width={['100%', '100%', '100%', '60rem']}
    >
      <Container
        dapp
        py="XL"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent={['center', 'flex-start']}
      >
        <VaultHeader size={processedData.data.length} />
        <VaultFilterTable
          register={register}
          setValue={setValue}
          getValues={getValues}
          control={control}
        />
        <VaultTable
          isDesktop={isDesktop}
          data={processedData.data}
          control={control}
          loading={processedData.loading}
        />
      </Container>
    </Box>
  );
};

export default Vault;
