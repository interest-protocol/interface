import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { LoadingSVG, TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnHeader, EarnTable } from './components';
import EarnFilters from './earn-filters';

const Earn: FC = () => {
  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );
  const [dataPools, setDataPools] = useState(data.pools);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (dataPools.length > 20) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setDataPools(
        dataPools.concat(Array.from({ length: 5 }, () => dataPools[0]))
      );
    }, 500);
  };

  useEffect(() => {
    setDataPools(data.pools);
  }, [data.pools]);

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
    <Box
      height="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box overflow="hidden">
        <EarnHeader />
        <Container dapp width="100%" px="NONE">
          <EarnFilters />
        </Container>
        <InfiniteScroll
          dataLength={dataPools.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Container dapp width="100%">
              <Box display="flex" alignItems="center" justifyContent="center">
                <LoadingSVG width="1rem" />
                <Typography fontSize="S" variant="normal" ml="M">
                  Loading
                </Typography>
              </Box>
            </Container>
          }
          scrollableTarget="body"
        >
          <Box>
            <EarnTable
              isPools
              data={dataPools}
              loading={data.loading}
              intUSDPrice={data.intUSDPrice}
            />
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default Earn;
