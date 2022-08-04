import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import search from '@/components/svg/search';
import { Box, InfiniteScroll, Typography } from '@/elements';
import { useGetFarmsSummary, useIdAccount } from '@/hooks';
import { LoadingSVG, TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnTable } from './components';
import EarnFilters from './components/earn-filters';
import { TEarnTableData } from './components/earn-table/earn-table.types';
import { IEarnForm } from './earn.types';

const Earn: FC = () => {
  const { chainId } = useIdAccount();
  const { register, setValue, control } = useForm<IEarnForm>({
    defaultValues: {
      search: '',
      sortBy: 'Select',
      isLive: true,
      isStaked: true,
    },
  });

  const [dataPools, setDataPools] = useState<TEarnTableData>([]);

  const [hasMore, setHasMore] = useState(true);

  const { error, data: rawData } = useGetFarmsSummary();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId, search]
  );

  useEffect(() => {
    setDataPools(
      Array.from({ length: 25 }, (_, index) => ({
        ...data.pools[index % data.pools.length],
        dropdownArgs: {
          intUSDPrice: data.intUSDPrice,
          farm: data.pools[index % data.pools.length].farm,
          farmTokenPrice: data.pools[index % data.pools.length].farmTokenPrice,
        },
      }))
    );
  }, []);

  const fetchMoreData = (length: number) => () => {
    if (length > 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setDataPools((dataPools) => [
        ...((dataPools ?? []) as TEarnTableData),
        ...Array.from({ length: 25 }, (_, index) => ({
          ...data.pools[index % data.pools.length],
          dropdownArgs: {
            farm: data.pools[index % data.pools.length].farm,
            intUSDPrice: data.intUSDPrice,
            farmTokenPrice:
              data.pools[index % data.pools.length].farmTokenPrice,
          },
        })),
      ]);
    }, 500);
  };

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
            hasMore={hasMore}
            next={fetchMoreData(dataPools.length)}
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
                loading={data.loading}
                isDesktop={isDesktop}
              />
            </Box>
          </InfiniteScroll>
        </Box>
      </Container>
    </Box>
  );
};

export default Earn;
