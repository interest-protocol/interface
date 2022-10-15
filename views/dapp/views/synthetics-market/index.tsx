import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useChainId, useGetDineroMarketsSummaryV2 } from '@/hooks';
import { BinanceUSDSVG, TimesSVG } from '@/svg';
import BorrowFilters from '@/views/dapp/views/dinero-market/components/borrow-filters';

import { BorrowTable } from './components';
import { BorrowSortByFilter } from './components/borrow-filters/borrow-filters.types';
import { IDineroMarketForm } from './synthetics-market.types';
import { getSafeDineroMarketSummaryData } from './synthetics-market.utils';

const SyntheticsMarket: FC = () => {
  const { register, setValue, control } = useForm<IDineroMarketForm>({
    defaultValues: {
      search: '',
      sortBy: BorrowSortByFilter.Default,
      onlyBorrowing: false,
    },
  });
  const t = useTranslations();
  const chainId = useChainId();

  const { data, error } = useGetDineroMarketsSummaryV2();

  const markets = useMemo(
    () => getSafeDineroMarketSummaryData(chainId, data),
    [data, chainId]
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
        <Typography variant="title3">Error fetching the contracts</Typography>
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
      <BorrowFilters
        control={control}
        register={register}
        setValue={setValue}
      />
      <BorrowTable chainId={chainId} control={control} markets={markets} />
    </Container>
  );
};

export default SyntheticsMarket;
