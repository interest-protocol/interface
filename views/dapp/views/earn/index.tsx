import { FC } from 'react';
import useSWR from 'swr';

import priorityHooks from '@/connectors/index';
import {
  PCS_V2_PAIR_BTC_DNR,
  PCS_V2_PAIR_BTC_INT,
} from '@/constants/contracts';
import { FARMS, PoolId, PoolType } from '@/constants/farms';
import { ZERO } from '@/constants/index';
import { Box, Typography } from '@/elements';
import { FarmV2 } from '@/sdk/entities/farm-v2';
import { TimesSVG } from '@/svg';
import { getCasaDePapelMintData, getPoolData } from '@/utils/casa-de-papel';
import { getBTCPrice } from '@/utils/price';
import { getReserves } from '@/utils/uniswap-v2';

import { Faucet } from '../../components';
import Web3Manager from '../../web3-manager';
import { EarnHeader, EarnTable } from './components';

const { usePriorityProvider, usePriorityChainId } = priorityHooks;

const Earn: FC = () => {
  const provider = usePriorityProvider();
  const chainId = usePriorityChainId();

  const { error, data } = useSWR(`Earn Pools ${chainId}`, async () => {
    if (!chainId || !provider) return;

    const [
      btcPrice,
      btcDnrReserves,
      btcIntReserves,
      btcIntPool,
      btcDnrPool,
      mintingData,
    ] = await Promise.all([
      getBTCPrice(provider),
      getReserves(provider, PCS_V2_PAIR_BTC_DNR),
      getReserves(provider, PCS_V2_PAIR_BTC_INT),
      getPoolData(provider, 0),
      getPoolData(provider, 1),
      getCasaDePapelMintData(provider),
    ]);

    return {
      intPerBlock: mintingData.interestTokenPerBlock,
      btcPrice,
      intPool: [
        FarmV2.fromPancakeSwap({
          ...FARMS[PoolId.Int],
          allocationPoints: btcIntPool.allocationPoints,
          totalAllocationPoints: mintingData.totalAllocationPoints,
          reserve0: btcIntReserves.reserve0,
          reserve1: btcIntReserves.reserve1,
        }),
      ],
      farms: [
        FarmV2.fromPancakeSwap({
          ...FARMS[PoolId.BtcDnr],
          allocationPoints: btcDnrPool.allocationPoints,
          totalAllocationPoints: mintingData.totalAllocationPoints,
          reserve0: btcDnrReserves.reserve0,
          reserve1: btcDnrReserves.reserve1,
        }),
      ],
    };
  });

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
    <Box display="flex" flexDirection="column" height="100%">
      <EarnHeader />
      <Box mt="XL">
        <EarnTable
          type={PoolType.Pool}
          farms={data?.intPool || []}
          intPerBlock={data?.intPerBlock || ZERO}
          baseTokenPrice={data?.btcPrice || ZERO}
          loading={!data?.intPool.length && !error}
        />
        <EarnTable
          type={PoolType.Farm}
          farms={data?.farms || []}
          intPerBlock={data?.intPerBlock || ZERO}
          baseTokenPrice={data?.btcPrice || ZERO}
          loading={!data?.farms.length && !error}
        />
      </Box>
      <Faucet />
    </Box>
  );
};

const EarnPage: FC = () => (
  <Web3Manager>
    <Earn />
  </Web3Manager>
);

export default EarnPage;
