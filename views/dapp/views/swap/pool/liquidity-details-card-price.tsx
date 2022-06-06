import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { LiquidityDetailsCardPriceProps } from './pool.type';

const LiquidityDetailsCardPrice: FC<LiquidityDetailsCardPriceProps> = ({
  price,
  title,
  symbol1,
  symbol2,
}) => {
  return (
    <Box
      width="100%"
      bg="bottomBackground"
      px="M"
      py="L"
      textAlign="center"
      borderRadius="M"
    >
      <Typography variant="normal" color="textSecondary">
        {title} price
      </Typography>
      <Typography variant="normal" my="M" fontWeight="600">
        {price}
      </Typography>
      <Typography variant="normal" color="textSecondary">
        {symbol1} per {symbol2}
      </Typography>
    </Box>
  );
};

export default LiquidityDetailsCardPrice;
