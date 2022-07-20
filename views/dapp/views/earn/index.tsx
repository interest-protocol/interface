import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';

import { Container, Switch } from '@/components';
import { Box, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnHeader, EarnTable } from './components';
import { getHeaderSwitchDefaultData } from './components/earn.data';
import { EarnPageProps } from './earn.types';
import EarnFilters from './earn-filters';

const Earn: FC<EarnPageProps> = ({ type }) => {
  const { push } = useRouter();
  const [farmPool, setFarmPool] = useState(type == 'farms');
  //const [stepData, setStepData] = useState(1);

  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );

  const SWITCH_DEFAULT_DATA = getHeaderSwitchDefaultData(setFarmPool, push);

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
        <Container dapp width="100%" px="NONE">
          <Box
            display="flex"
            justifyContent="center"
            py="L"
            borderRadius="L"
            bg="foreground"
          >
            <Switch
              defaultValue={farmPool ? 'farms' : 'pool'}
              options={SWITCH_DEFAULT_DATA}
            />
          </Box>
          <EarnFilters type={farmPool ? 'farms' : 'pool'} />
        </Container>
        <Box>
          {farmPool ? (
            <EarnTable
              data={data.farms}
              loading={data.loading}
              intUSDPrice={data.intUSDPrice}
            />
          ) : (
            <EarnTable
              isPools
              data={data.pools}
              loading={data.loading}
              intUSDPrice={data.intUSDPrice}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Earn;
