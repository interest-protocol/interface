import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import OutOfRange from './out-of-range';
import { LiquidityProps } from './pool.types';

const Liquidity: FC<LiquidityProps> = ({
  amount,
  symbols,
  amountUSD,
  hasWarning,
}) => {
  const FirstIcon =
    TOKENS_SVG_MAP[symbols[0]] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const SecondIcon =
    TOKENS_SVG_MAP[symbols[1]] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Link
      shallow
      href={Routes[RoutesEnum.DEXPoolDetails]}
      as={`${Routes[RoutesEnum.DEXPool]}/${symbols[0]}/${symbols[1]}/`}
    >
      <Box
        py="M"
        px="L"
        mb="M"
        display="flex"
        cursor="pointer"
        borderRadius="0.8rem"
        bg="bottomBackground"
        flexDirection="column"
        hover={{ bg: 'textSoft' }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" mb="M">
            <Box my="M" display="flex" alignItems="center">
              <FirstIcon width="1.2rem" />
              <SecondIcon width="1.2rem" />
              <Typography mx="M" as="span" variant="normal">
                {symbols[0]} / {symbols[1]}
              </Typography>
            </Box>
          </Box>

          {hasWarning && <OutOfRange />}
        </Box>
        <Box>
          <Typography variant="normal" fontSize="0.8rem" fontWeight="500">
            <Typography
              variant="normal"
              as="span"
              fontSize="0.8rem"
              color="textSecondary"
            >
              Total Deposits:{' '}
            </Typography>
            {amount}
            {' ⟷ '}
            {amountUSD}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default Liquidity;
