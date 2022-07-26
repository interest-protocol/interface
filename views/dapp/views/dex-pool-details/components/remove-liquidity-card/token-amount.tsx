import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Typography } from '@/elements';

import { TokenAmountProps } from './remove-liquidity-card.types';

const TokenAmount: FC<TokenAmountProps> = ({ Icon, symbol, control, name }) => {
  const amount = useWatch({ control, name });
  return (
    <Box display="flex" my="L">
      {Icon}
      <Typography variant="normal" ml="M">
        {symbol}: {amount}
      </Typography>
    </Box>
  );
};

export default TokenAmount;
