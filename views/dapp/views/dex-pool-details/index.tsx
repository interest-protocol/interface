import { FC, useMemo } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { useGetPairMetadata } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { IntMath } from '@/sdk';
import { formatMoney } from '@/utils';

import GoBack from '../../components/go-back';
import {
  LiquidityDetailsCard,
  LiquidityForm,
  RemoveLiquidityCard,
} from './components';
import {
  DEXPoolDetailsViewProps,
  LiquidityDetailsCardProps,
} from './dex-pool-details.types';
import { processPairMailMetadata } from './utils';

const DefaultIcon = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  const { error, data } = useGetPairMetadata(pairAddress);

  const processedData = useMemo(() => processPairMailMetadata(data), [data]);

  // TODO UI improvement
  if (error) return <div>error</div>;

  const CARD: LiquidityDetailsCardProps = {
    title: 'Liquidity',
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
        <LiquidityForm
          balances={[10000, 10]}
          Icons={[
            <FirstIcon width="1rem" key={v4()} />,
            <SecondIcon width="1rem" key={v4()} />,
          ]}
        />
      </Box>
      <RemoveLiquidityCard
        pairAddress={pairAddress}
        token0={processedData.token0}
        token1={processedData.token1}
        isStable={processedData.isStable}
        token0Metadata={processedData.token0Metadata}
        token1Metadata={processedData.token1Metadata}
      />
    </Container>
  );
};

export default DEXPoolDetailsView;
