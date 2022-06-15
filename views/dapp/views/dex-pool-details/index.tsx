import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import { LiquidityDetailsCardProps } from '../dex/pool/pool.types';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';
import LiquidityDetailsCard from './liquidity-details-card';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({
  tokens: [firstToken, secondToken],
}) => {
  const CARDS: ReadonlyArray<LiquidityDetailsCardProps> = [
    {
      title: 'Liquidity',
      totalDeposits: formatDollars(Math.random() * 7643432),
      lines: [
        {
          perceptual: '0',
          symbol: firstToken,
          value: formatMoney(Math.random() * 65823.0),
        },
        {
          perceptual: '100',
          symbol: secondToken,
          value: formatMoney(Math.random() * 65823.0),
        },
      ],
    },
    {
      title: 'Unclaimed fees',
      totalDeposits: formatDollars(Math.random() * 76432732),
      lines: [
        {
          perceptual: '0',
          symbol: firstToken,
          value: formatMoney(Math.random() * 65823.0),
        },
        {
          perceptual: '100',
          symbol: secondToken,
          value: formatMoney(Math.random() * 65823.0),
        },
      ],
    },
  ];

  const DefaultIcon = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const FirstIcon = TOKENS_SVG_MAP[firstToken] ?? DefaultIcon;
  const SecondIcon = TOKENS_SVG_MAP[secondToken] ?? DefaultIcon;

  return (
    <Container dapp mt="XXL" width="100%">
      <Box display="flex" alignItems="center">
        <FirstIcon width="2rem" />
        <SecondIcon width="2rem" />
        <Typography variant="normal" ml="L">
          Pool Details
        </Typography>
      </Box>
      <Box
        my="L"
        color="text"
        width="100%"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        {CARDS.map((card) => (
          <LiquidityDetailsCard key={v4()} {...card} />
        ))}
        {}
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
