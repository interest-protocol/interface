import { FC, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { useChainId, useGetPairData } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { IntMath } from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { TimesSVG } from '@/svg';
import {
  formatMoney,
  replaceWrappedNativeTokenWithNativeTokenSymbol,
} from '@/utils';

import GoBack from '../../components/go-back';
import {
  AddLiquidityCard,
  LiquidityDetailsCard,
  RemoveLiquidityCard,
} from './components';
import HeaderSkeleton from './components/skeleton/header';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';
import { processPairData } from './utils';

const DefaultIcon = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  const { error, data } = useGetPairData(pairAddress);
  const chainId = useChainId();

  const nativeBalance = useSelector(getNativeBalance) as string;

  const processedData = useMemo(
    () => processPairData(chainId, data, nativeBalance),
    [chainId, data, nativeBalance]
  );

  if (error)
    return (
      <Box
        my="XXXL"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="10rem" />
        </Box>
        <Typography variant="normal">ERROR! Fetching the pair data</Typography>
      </Box>
    );

  if (!processedData.pairExists)
    return (
      <Box
        my="XXXL"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="10rem" />
        </Box>
        <Typography variant="normal">
          The pair with address {pairAddress} does not exist
        </Typography>
      </Box>
    );

  const FirstIcon =
    TOKENS_SVG_MAP[
      replaceWrappedNativeTokenWithNativeTokenSymbol(
        processedData.token0Metadata.symbol
      )
    ] ?? DefaultIcon;
  const SecondIcon =
    TOKENS_SVG_MAP[
      replaceWrappedNativeTokenWithNativeTokenSymbol(
        processedData.token1Metadata.symbol
      )
    ] ?? DefaultIcon;

  return (
    <Container dapp mt="XXL" width="100%">
      <GoBack routeBack />
      <Box display="flex" alignItems="center">
        {processedData.loading ? (
          <HeaderSkeleton />
        ) : (
          <>
            <FirstIcon width="2rem" />
            <SecondIcon width="2rem" />
            <Typography variant="normal" ml="L">
              {processedData.token0Metadata.symbol +
                ' - ' +
                processedData.token1Metadata.symbol +
                ' ' +
                (processedData.isStable ? 'Stable' : 'Volatile') +
                ' Pool Details'}
            </Typography>
          </>
        )}
      </Box>
      <Box
        mt="XL"
        color="text"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <LiquidityDetailsCard
          isStable={processedData.isStable}
          lines={[
            {
              symbol: processedData.token0Metadata.symbol,
              value: formatMoney(
                IntMath.toNumber(
                  processedData.reserve0,
                  processedData.token0Metadata.decimals.toNumber()
                )
              ),
              isFetchingInitialData: processedData.loading,
            },
            {
              symbol: processedData.token1Metadata.symbol,
              value: formatMoney(
                IntMath.toNumber(
                  processedData.reserve1,
                  processedData.token1Metadata.decimals.toNumber()
                )
              ),
              isFetchingInitialData: processedData.loading,
            },
          ]}
        />
        <AddLiquidityCard
          fetchingInitialData={processedData.loading}
          isStable={processedData.isStable}
          tokens={[
            {
              symbol: processedData.token0Metadata.symbol,
              Icon: <FirstIcon width="1rem" />,
              balance: processedData.token0Balance,
              allowance: processedData.token0Allowance,
              decimals: processedData.token0Metadata.decimals.toNumber(),
              address: processedData.token0,
            },
            {
              symbol: processedData.token1Metadata.symbol,
              Icon: <SecondIcon width="1rem" />,
              balance: processedData.token1Balance,
              allowance: processedData.token1Allowance,
              decimals: processedData.token1Metadata.decimals.toNumber(),
              address: processedData.token1,
            },
          ]}
        />
        <RemoveLiquidityCard
          pairAddress={pairAddress}
          isFetchingInitialData={processedData.loading}
          isStable={processedData.isStable}
          lpAllowance={processedData.lpAllowance}
          lpBalance={processedData.lpBalance}
          tokens={[
            {
              symbol: processedData.token0Metadata.symbol,
              Icon: processedData.loading ? (
                <Box width="1rem" height="1rem" borderRadius="2rem">
                  <Skeleton height="100%" borderRadius="2rem" />
                </Box>
              ) : (
                <FirstIcon width="1rem" />
              ),
              address: processedData.token0,
              decimals: processedData.token0Metadata.decimals.toNumber(),
            },
            {
              symbol: processedData.token1Metadata.symbol,
              Icon: processedData.loading ? (
                <Box width="1rem" height="1rem" borderRadius="2rem">
                  <Skeleton height="100%" borderRadius="2rem" />
                </Box>
              ) : (
                <SecondIcon width="1rem" />
              ),
              address: processedData.token1,
              decimals: processedData.token1Metadata.decimals.toNumber(),
            },
          ]}
        />
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
