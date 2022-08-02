import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { replaceWrappedNativeTokenWithNativeTokenSymbol } from '@/utils';

import { LiquidityDetailsCardLineProps } from '../../dex-pool-details.types';

const LiquidityDetailsCardLine: FC<LiquidityDetailsCardLineProps> = ({
  value,
  symbol,
  isFetchingInitialData,
}) => {
  const TokenSVG =
    TOKENS_SVG_MAP[replaceWrappedNativeTokenWithNativeTokenSymbol(symbol)] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" justifyContent="space-between" my="M">
      <Box display="flex" alignItems="center">
        {isFetchingInitialData ? (
          <>
            <Box width="1.2rem" height="1.2rem" borderRadius="2rem">
              <Skeleton height="100%" borderRadius="2rem" />
            </Box>
            <Box width="2.5rem" ml="S">
              <Skeleton />
            </Box>
          </>
        ) : (
          <>
            <TokenSVG width="1.2rem" />
            <Typography
              mx="M"
              as="span"
              variant="normal"
              fontWeight="500"
              color="textSecondary"
            >
              {symbol}
            </Typography>{' '}
          </>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="normal" mr="M" fontSize="0.8rem">
          {isFetchingInitialData ? (
            <Box width="2.5rem">
              <Skeleton />
            </Box>
          ) : (
            value
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default LiquidityDetailsCardLine;
