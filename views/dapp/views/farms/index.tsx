import { useTranslations } from 'next-intl';
import { FC, useCallback, useMemo } from 'react';

import { Container } from '@/components';
import { Box, InfiniteScroll, Typography } from '@/elements';
import { useGetFarmsSummary, useIdAccount } from '@/hooks';
import useEventListener from '@/hooks/use-event-listener';
import { LoadingSVG, TimesSVG } from '@/svg';
import { noop } from '@/utils';

import FarmsFilters from './components/farms-filters';
import FarmsTable from './components/farms-table';
import { FarmsProps } from './farms.types';
import { getSafeFarmSummaryData } from './farms.utils';

const Farms: FC<FarmsProps> = ({ desktopState, formFarm }) => {
  const t = useTranslations();
  const { chainId } = useIdAccount();
  const { error, data: rawData } = useGetFarmsSummary();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );

  const handleSetDesktop = useCallback(() => {
    const mediaIsDesktop = window.matchMedia('(min-width: 64em)').matches;
    desktopState.setDesktop(mediaIsDesktop);
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
    <Box display="flex" flexDirection="column" flex="1">
      <Box>
        <Container
          dapp
          py="XL"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent={['center', 'flex-start']}
        >
          <Typography variant="normal" ml="M">
            Farms
          </Typography>
        </Container>
      </Box>
      <Container
        dapp
        width="100%"
        height="100%"
        display="flex"
        position="relative"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <FarmsFilters
            control={formFarm.control}
            register={formFarm.register}
            setValue={formFarm.setValue}
          />
          <InfiniteScroll
            overflow="visible !important"
            hasMore={false}
            next={noop}
            scrollableTarget="body"
            dataLength={data.farms.length}
            loader={
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box as="span" display="inline-block" width="1rem">
                  <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
                </Box>
                <Typography fontSize="S" variant="normal" ml="M">
                  {t('common.load', { isLoading: 1 })}
                </Typography>
              </Box>
            }
          >
            <Box>
              <FarmsTable
                loading={data.loading}
                isDesktop={desktopState.isDesktop}
                intUSDPrice={data.intUSDPrice}
                control={formFarm.control}
                farms={data.farms}
              />
            </Box>
          </InfiniteScroll>
        </Box>
      </Container>
    </Box>
  );
};

export default Farms;
