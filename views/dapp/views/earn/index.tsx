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
  const [isFilterSearch, setIsFilterSearch] = useState<boolean>(false);

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
      Array.from({ length: 5 }, (_, index) => ({
        ...data.farms[index % data.farms.length],
        dropdownArgs: {
          intUSDPrice: data.intUSDPrice,
          farm: data.farms[index % data.farms.length].farm,
          farmTokenPrice: data.farms[index % data.farms.length].farmTokenPrice,
        },
      }))
    );
  }, [data.farms]);

  const fetchMoreData = (length: number) => () => {
    if (length > 200) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setHasMore(false);
      setDataPools((dataPools: TEarnTableData) => [
        ...((dataPools ?? []) as TEarnTableData),
        ...Array.from({ length: 5 }, (_, index) => ({
          ...data.farms[index % data.farms.length],
          dropdownArgs: {
            farm: data.farms[index % data.farms.length].farm,
            intUSDPrice: data.intUSDPrice,
            farmTokenPrice:
              data.farms[index % data.farms.length].farmTokenPrice,
          },
        })),
      ]);
    }, 500);

    setTimeout(() => {
      setHasMore(true);
    }, 2500);
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
            isFilterSearch={isFilterSearch}
            setIsFilterSearch={setIsFilterSearch}
          />
          <InfiniteScroll
            overflow="visible !important"
            hasMore={data.loading ? false : hasMore}
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
