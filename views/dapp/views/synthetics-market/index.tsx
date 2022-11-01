import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { BinanceUSDSVG, TimesSVG } from '@/svg';

import { SyntheticsFilters, SyntheticsList } from './components';
import { useGetSyntheticMarketsSummary } from './synthetics-market.hooks';
import {
  ISyntheticMarketSummaryForm,
  SyntheticMarketSortByFilter,
} from './synthetics-market.types';
import { processSyntheticMarketSummaryData } from './synthetics-market.utils';

const SyntheticsMarket: FC = () => {
  const { register, setValue, control } = useForm<ISyntheticMarketSummaryForm>({
    defaultValues: {
      search: '',
      sortBy: SyntheticMarketSortByFilter.Default,
      onlyMinted: false,
    },
  });
  const t = useTranslations();
  const { chainId, account } = useIdAccount();

  const { error, data } = useGetSyntheticMarketsSummary(account, chainId);

  const markets = useMemo(
    () => processSyntheticMarketSummaryData(chainId, data),
    [chainId, account, data]
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
    <Container
      dapp
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        py="XL"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent={['center', 'flex-start']}
      >
        <BinanceUSDSVG width="2rem" height="2rem" />
        <Typography variant="normal" ml="M">
          {t('syntheticsMarket.title')}
        </Typography>
      </Box>
      <SyntheticsFilters
        control={control}
        register={register}
        setValue={setValue}
      />
      <SyntheticsList chainId={chainId} control={control} markets={markets} />
    </Container>
  );
};

export default SyntheticsMarket;
