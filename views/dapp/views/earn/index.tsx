import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Container } from '@/components';
import { Box, InfiniteScroll, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { LoadingSVG, TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnTable } from './components';
import EarnFilters from './components/earn-filters';
import { IEarnForm } from './earn.types';

const Earn: FC = () => {
  const { register, setValue, control } = useForm<IEarnForm>({
    defaultValues: {
      search: '',
      sortBy: 'Select',
      isLive: true,
      isStaked: true,
    },
  });

  const sortBy = useWatch({
    control,
    name: 'sortBy',
  });
  const isStaked = useWatch({
    control,
    name: 'isStaked',
  });
  const isLive = useWatch({
    control,
    name: 'isLive',
  });
  const search = useWatch({
    control,
    name: 'search',
  });

  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId, search]
  );

  const [dataPools, setDataPools] = useState(
    data.pools.map((pool) => ({
      ...pool,
      dropdownArgs: {
        farm: pool.farm,
        intUSDPrice: data.intUSDPrice,
        farmTokenPrice: pool.farmTokenPrice,
      },
    }))
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (dataPools.length > 200) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setHasMore(false);
      setDataPools(
        dataPools.concat(
          Array.from({ length: 5 }, () => ({
            ...data.pools[Math.floor(Math.random() * 2)],
            dropdownArgs: {
              farm: data.pools[Math.floor(Math.random() * 2)].farm,
              intUSDPrice: data.intUSDPrice,
              farmTokenPrice:
                data.pools[Math.floor(Math.random() * 2)].farmTokenPrice,
            },
          }))
        )
      );
    }, 500);

    setTimeout(() => {
      setHasMore(true);
    }, 3000);
  };

  useEffect(() => {
    setDataPools(
      data.pools.map((pool) => ({
        ...pool,
        dropdownArgs: {
          farm: pool.farm,
          intUSDPrice: data.intUSDPrice,
          farmTokenPrice: pool.farmTokenPrice,
        },
      }))
    );
  }, [data.pools]);

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
          register={register}
          setValue={setValue}
          isLive={isLive}
          isStaked={isStaked}
          sortBy={sortBy}
        />
        {/* TODO: filters watching */}
        filters:
        {search} {isStaked ? 'staked' : 'noStaked'}
        {isLive ? 'Live' : 'Finished'} {sortBy}
        <InfiniteScroll
          overflow="visible !important"
          hasMore={hasMore}
          next={fetchMoreData}
          scrollableTarget="body"
          dataLength={dataPools.length}
          loader={
            <Box display="flex" alignItems="center" justifyContent="center">
              <LoadingSVG width="1rem" />
              <Typography fontSize="S" variant="normal" ml="M">
                Loading
              </Typography>
            </Box>
          }
        >
          <Box>
            <EarnTable
              isPools
              data={dataPools}
              isDesktop={isDesktop}
              loading={data.loading}
            />
          </Box>
        </InfiniteScroll>
      </Box>
    </Container>
  );
};

export default Earn;
