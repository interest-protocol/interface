import { compose, find, propEq, propOr } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { MAIL_FAUCET_TOKENS, TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import GoBack from '../../components/go-back';
import { LiquidityForm } from './components';
import LiquidityDetailsCard from './components/liquidity-details-card';
import {
  DEXPoolDetailsViewProps,
  LiquidityDetailsCardProps,
} from './dex-pool-details.types';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({
  tokens: [firstAddress, secondAddress],
}) => {
  const [firstToken, secondToken] = [
    compose(
      propOr('', 'symbol'),
      find(propEq('address', firstAddress))
    )(MAIL_FAUCET_TOKENS[4]),
    compose(
      propOr('', 'symbol'),
      find(propEq('address', secondAddress))
    )(MAIL_FAUCET_TOKENS[4]),
  ] as [string, string];

  const CARD: LiquidityDetailsCardProps = {
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
  };

  const DefaultIcon = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const FirstIcon = TOKENS_SVG_MAP[firstToken] ?? DefaultIcon;
  const SecondIcon = TOKENS_SVG_MAP[secondToken] ?? DefaultIcon;

  return (
    <Container dapp mt="XXL" width="100%">
      <GoBack routeBack />
      <Box display="flex" alignItems="center">
        <FirstIcon width="2rem" />
        <SecondIcon width="2rem" />
        <Typography variant="normal" ml="L">
          {firstToken} - {secondToken} Pool Details
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
    </Container>
  );
};

export default DEXPoolDetailsView;
