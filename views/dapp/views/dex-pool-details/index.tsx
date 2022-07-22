import { FC, useMemo } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { useGetPairData, useIdAccount } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { IntMath } from '@/sdk';
import { TimesSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import GoBack from '../../components/go-back';
import {
  AddLiquidityCard,
  LiquidityDetailsCard,
  RemoveLiquidityCard,
} from './components';
import {
  DEXPoolDetailsViewProps,
  LiquidityDetailsCardProps,
} from './dex-pool-details.types';
import { processPairData } from './utils';

const DefaultIcon = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  const { error, data } = useGetPairData(pairAddress);

  const processedData = useMemo(() => processPairData(data), [data]);

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

  const CARD: LiquidityDetailsCardProps = {
    title: 'Liquidity',
    balance: formatDollars(IntMath.toNumber(processedBalancesData.balance)),
    lines: [
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
            processedData.reserve0,
            processedData.token0Metadata.decimals.toNumber()
          )
        ),
      },
    ],
  };

  const FirstIcon =
    TOKENS_SVG_MAP[processedData.token0Metadata.symbol] ?? DefaultIcon;
  const SecondIcon =
    TOKENS_SVG_MAP[processedData.token1Metadata.symbol] ?? DefaultIcon;

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
        <LiquidityDetailsCard {...CARD} />
        <AddLiquidityCard
          balances={[10000, 10]}
          pairAddress={pairAddress}
          isStable={processedData.isStable}
          lpBalance={processedBalancesData}
          addresses={[processedData.token0, processedData.token1]}
          tokens={[
            {
              symbol: processedData.token0Metadata.symbol,
              Icon: <FirstIcon width="1rem" key={v4()} />,
            },
            {
              symbol: processedData.token1Metadata.symbol,
              Icon: <SecondIcon width="1rem" key={v4()} />,
            },
          ]}
        />
        <RemoveLiquidityCard
          pairAddress={pairAddress}
          lpBalance={processedBalancesData}
          isStable={processedData.isStable}
          token0Metadata={processedData.token0Metadata}
          token1Metadata={processedData.token1Metadata}
          addresses={[processedData.token0, processedData.token1]}
          tokens={[
            {
              symbol: processedData.token0Metadata.symbol,
              Icon: <FirstIcon width="1rem" key={v4()} />,
            },
            {
              symbol: processedData.token1Metadata.symbol,
              Icon: <SecondIcon width="1rem" key={v4()} />,
            },
          ]}
        />
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
