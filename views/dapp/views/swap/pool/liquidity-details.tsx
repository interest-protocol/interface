import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import LiquidityDetailsCard from './liquidity-details-card';
import LiquidityDetailsCardPrice from './liquidity-details-card-price';
import LiquidityDetailsCardPriceWrapper from './liquidity-details-card-price-wrapper';
import OutOfRange from './out-of-range';
import { LiquidityDetailsCardProps } from './pool.type';

const LiquidityDetails: FC = () => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const CARDS: ReadonlyArray<LiquidityDetailsCardProps> = [
    {
      title: 'Liquidity',
      lines: [
        {
          TokenSVG: DefaultTokenSVG,
          perceptual: '0',
          symbol: 'DAI',
          value: '0',
        },
        {
          TokenSVG: DefaultTokenSVG,
          perceptual: '100',
          symbol: 'ETH',
          value: '0.00075',
        },
      ],
    },
    {
      title: 'Unclaimed fees',
      lines: [
        {
          TokenSVG: DefaultTokenSVG,
          perceptual: '0',
          symbol: 'DAI',
          value: '0',
        },
        {
          TokenSVG: DefaultTokenSVG,
          perceptual: '100',
          symbol: 'ETH',
          value: '0.00075',
        },
      ],
    },
  ];
  return (
    <Box
      my="L"
      color="text"
      maxWidth="50rem"
      minWidth="40rem"
      borderRadius="M"
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {CARDS.map((card) => (
        <LiquidityDetailsCard
          key={v4()}
          title={card.title}
          lines={card.lines}
        />
      ))}
      <Box
        bg="foreground"
        width="100%"
        pb="XL"
        px="L"
        borderRadius="M"
        mt="L"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box py="L" display="flex" width="100%" alignItems="center">
          <Typography variant="normal" fontWeight="600" as="span">
            Price range
          </Typography>
          <OutOfRange />
        </Box>
        <LiquidityDetailsCardPriceWrapper size="47%">
          <LiquidityDetailsCardPrice
            title="Min"
            price="1,821,100,000,000,000"
            symbol1="DAI"
            symbol2="ETH"
          />
        </LiquidityDetailsCardPriceWrapper>
        <Box
          width="2%"
          display="flex"
          alignItems="center"
          color="textSecondary"
        >
          ⟷
        </Box>
        <LiquidityDetailsCardPriceWrapper size="47%">
          <LiquidityDetailsCardPrice
            title="Max"
            price="1,821,100,000,000,000"
            symbol1="DAI"
            symbol2="ETH"
          />
        </LiquidityDetailsCardPriceWrapper>
        <LiquidityDetailsCardPriceWrapper size="100%">
          <LiquidityDetailsCardPrice
            title="Current"
            price="1,821,100,000,000,000"
            symbol1="DAI"
            symbol2="ETH"
          />
        </LiquidityDetailsCardPriceWrapper>
      </Box>
    </Box>
  );
};

export default LiquidityDetails;
