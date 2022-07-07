import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container, Switch } from '@/components';
import { Box, Input, Typography } from '@/elements';
import { useGetFarmsSummary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { TimesSVG } from '@/svg';
import { getSafeFarmSummaryData } from '@/utils';

import { EarnHeader, EarnTable } from './components';
import { getSwitchDefaultData } from './components/earn.data';
import { EarnPageProps } from './earn.types';
import PaginationButton from './pagination-buttons';

const Earn: FC<EarnPageProps> = ({ type }) => {
  const { register } = useForm({ defaultValues: { search: '' } });
  const { push } = useRouter();
  const [farmPool, setFarmPool] = useState(type == 'farms');
  const [stepData, setStepData] = useState(0);

  const { error, data: rawData } = useGetFarmsSummary();
  const { chainId } = useIdAccount();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );

  const SWITCH_DEFAULT_DATA = getSwitchDefaultData(setFarmPool, push);

  const showPagButton = () =>
    type == 'farms' ? data.farms.length >= 9 : data.pools.length >= 9;

  useEffect(() => {
    setStepData(0);
  }, [farmPool]);

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
          <Box p="L" mt="M" borderRadius="L" bg="foreground" width="100%">
            <Input
              py="L"
              color="text"
              width="100%"
              borderRadius="L"
              border="1px solid"
              {...register('search')}
              borderColor="textSecondary"
              placeholder={
                'Search ' +
                (farmPool ? 'farm ' : 'pool ') +
                'by name, symbol or address...'
              }
              focus={{
                borderColor: 'accent',
              }}
            />
          </Box>
        </Container>
        <Box>
          {farmPool ? (
            <EarnTable
              data={data.farms.slice(0 + stepData, 9 + stepData)}
              loading={data.loading}
              intUSDPrice={data.intUSDPrice}
            />
          ) : (
            <EarnTable
              isPools
              data={data.pools.slice(0 + stepData, 9 + stepData)}
              loading={data.loading}
              intUSDPrice={data.intUSDPrice}
            />
          )}
        </Box>
        {showPagButton() && (
          <PaginationButton
            setStepData={setStepData}
            stepData={stepData}
            farmsSize={data.farms.length}
            poolSize={data.pools.length}
            type={type}
          />
        )}
      </Box>
    </Box>
  );
};

export default Earn;
