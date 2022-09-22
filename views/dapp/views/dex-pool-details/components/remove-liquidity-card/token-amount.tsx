import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { COMMON_STRINGS } from '@/constants';
import { Box, Typography } from '@/elements';

import { TokenAmountProps } from './remove-liquidity-card.types';

const TokenAmount: FC<TokenAmountProps> = ({ Icon, symbol, control, name }) => {
  const amount = useWatch({ control, name });
  return (
    <>
      {Icon}
      <Typography variant="normal" ml="M">
        {symbol == '???' ? (
          <Box width="2.5rem">
            <Skeleton />
          </Box>
        ) : (
          symbol
        )}
      </Typography>
      <Typography variant="normal">{COMMON_STRINGS.colon + amount}</Typography>
    </>
  );
};

export default TokenAmount;
