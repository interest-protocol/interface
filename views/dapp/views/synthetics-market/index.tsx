import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { BinanceUSDSVG, TimesSVG } from '@/svg';

import { SyntheticsFilters, SyntheticsList } from './components';
import { BorrowSortByFilter } from './components/synthetics-filters/synthetics-filters.types';
import { markets } from './synthetics-market.mock';
import { IDineroMarketForm } from './synthetics-market.types';

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

  const error = false;

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
