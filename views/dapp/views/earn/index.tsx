import { FC, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import { Box, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnHeader, EarnTable } from './components';

const Earn: FC = () => {
  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

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
    <Box
      height="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <EarnHeader />
        <Box mt="XL">
          <EarnTable
            isPools
            data={Array.from({ length: 25 }, () => ({
              ...data.pools[0],
              dropdownArgs: {
                farm: data.pools[0].farm,
                intUSDPrice: data.intUSDPrice,
                farmTokenPrice: data.pools[0].farmTokenPrice,
              },
            }))}
            isDesktop={isDesktop}
            loading={data.loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Earn;
