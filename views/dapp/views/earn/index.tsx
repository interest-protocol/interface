import { FC, useMemo } from 'react';

import { Box, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { Faucet } from '../../components';
import { EarnHeader, EarnTable } from './components';

const Earn: FC = () => {
  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
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
            data={data.pools}
            loading={data.loading}
            intUSDPrice={data.intUSDPrice}
          />
          <EarnTable
            data={data.farms}
            loading={data.loading}
            intUSDPrice={data.intUSDPrice}
          />
        </Box>
      </Box>
      <Faucet />
    </Box>
  );
};

export default Earn;
