import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

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
        <FirstIcon width="2rem" />
        <SecondIcon width="2rem" />
        <Typography variant="normal" ml="L">
          {processedData.token0Metadata.symbol} -{' '}
          {processedData.token1Metadata.symbol}{' '}
          {processedData.isStable ? 'Stable' : 'Volatile'} Pool Details
        </Typography>
      </Box>
      <Box
        mt="XL"
        color="text"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <LiquidityDetailsCard
          lines={[
            {
              symbol: processedData.token0Metadata.symbol,
              value: formatMoney(
                IntMath.toNumber(
                  processedData.reserve0,
                  processedData.token0Metadata.decimals.toNumber()
                )
              ),
            },
            {
              symbol: processedData.token1Metadata.symbol,
              value: formatMoney(
                IntMath.toNumber(
                  processedData.reserve1,
                  processedData.token1Metadata.decimals.toNumber()
                )
              ),
            },
          ]}
        />
        <AddLiquidityCard
          pairAddress={pairAddress}
          isStable={processedData.isStable}
          addresses={[processedData.token0, processedData.token1]}
          tokens={[
            {
              symbol: processedData.token0Metadata.symbol,
              Icon: <FirstIcon width="1rem" key={v4()} />,
              balance: processedData.token0Balance,
              allowance: processedData.token0Allowance,
              decimals: processedData.token0Metadata.decimals.toNumber(),
              address: processedData.token0,
            },
            {
              symbol: processedData.token1Metadata.symbol,
              Icon: <SecondIcon width="1rem" key={v4()} />,
              balance: processedData.token1Balance,
              allowance: processedData.token1Allowance,
              decimals: processedData.token1Metadata.decimals.toNumber(),
              address: processedData.token1,
            },
          ]}
        />
        {/*<RemoveLiquidityCard*/}
        {/*  pairAddress={pairAddress}*/}
        {/*  lpBalance={{*/}
        {/*    allowance: ZERO_BIG_NUMBER,*/}
        {/*    balance: ZERO_BIG_NUMBER,*/}
        {/*  }}*/}
        {/*  isStable={processedData.isStable}*/}
        {/*  token0Metadata={processedData.token0Metadata}*/}
        {/*  token1Metadata={processedData.token1Metadata}*/}
        {/*  addresses={[processedData.token0, processedData.token1]}*/}
        {/*  tokens={[*/}
        {/*    {*/}
        {/*      symbol: processedData.token0Metadata.symbol,*/}
        {/*      Icon: <FirstIcon width="1rem" key={v4()} />,*/}
        {/*    },*/}
        {/*    {*/}
        {/*      symbol: processedData.token1Metadata.symbol,*/}
        {/*      Icon: <SecondIcon width="1rem" key={v4()} />,*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
