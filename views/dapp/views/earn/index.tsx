import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, InfiniteScroll, Typography } from '@/elements';
import { useGetFarmsSummary, useIdAccount } from '@/hooks';
import { LoadingSVG, TimesSVG } from '@/svg';
import { noop } from '@/utils';

import { EarnTable } from './components';
import EarnFilters from './components/earn-filters';
import { FarmSortByFilter, FarmTypeFilter, IEarnForm } from './earn.types';
import { getSafeFarmSummaryData } from './utils';

const Earn: FC = () => {
  const { chainId } = useIdAccount();

  const { register, setValue, control } = useForm<IEarnForm>({
    defaultValues: {
      search: '',
      sortBy: FarmSortByFilter.Default,
      typeFilter: FarmTypeFilter.All,
      onlyFinished: false,
      onlyStaked: false,
    },
  });

  const { error, data: rawData, mutate } = useGetFarmsSummary();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );

  const [isDesktop, setDesktop] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsDesktop = window.matchMedia('(min-width: 64em)').matches;
    setDesktop(mediaIsDesktop);
  }, []);

  useEffect(() => {
    handleSetDesktop();
    window.addEventListener('resize', handleSetDesktop);
    return () => window.removeEventListener('resize', handleSetDesktop);
  }, []);

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
          <EarnFilters
            control={control}
            register={register}
            setValue={setValue}
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
                  <LoadingSVG width="100%" />
                </Box>
                <Typography fontSize="S" variant="normal" ml="M">
                  Loading
                </Typography>
              </Box>
            }
          >
            <Box>
              <EarnTable
                loading={data.loading}
                isDesktop={isDesktop}
                intUSDPrice={data.intUSDPrice}
                mutate={mutate}
                control={control}
                farms={data.farms}
              />
            </Box>
          </InfiniteScroll>
        </Box>
      </Container>
    </Box>
  );
};

export default Earn;
