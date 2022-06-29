import Link from 'next/link';
import { compose, find, propEq, propOr } from 'ramda';
import { FC } from 'react';

import {
  MAIL_FAUCET_TOKENS,
  Routes,
  RoutesEnum,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { LiquidityProps } from '../pool.types';

const Liquidity: FC<LiquidityProps> = ({ amount, symbols, amountUSD }) => {
  const [address1, address2] = [
    compose(
      propOr('', 'address'),
      find(propEq('symbol', symbols[0]))
    )(MAIL_FAUCET_TOKENS[4]),
    compose(
      propOr('', 'address'),
      find(propEq('symbol', symbols[1]))
    )(MAIL_FAUCET_TOKENS[4]),
  ];

  const FirstIcon =
    TOKENS_SVG_MAP[symbols[0]] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const SecondIcon =
    TOKENS_SVG_MAP[symbols[1]] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Link
      shallow
      href={Routes[RoutesEnum.DEXPoolDetails]}
      as={`${Routes[RoutesEnum.DEXPool]}/${address1}-${address2}/`}
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
