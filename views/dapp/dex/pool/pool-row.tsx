import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { UnknownCoinSVG } from '@/svg';

import { PoolRowProps } from './pool.types';

const PoolRow: FC<PoolRowProps> = ({
  symbol0,
  symbol1,
  type0,
  type1,
  pairAddress,
}) => {
  const FirstIcon = TOKENS_SVG_MAP[type0] ?? UnknownCoinSVG;
  const SecondIcon = TOKENS_SVG_MAP[type1] ?? UnknownCoinSVG;

  return (
    <Link
      href={`${Routes[RoutesEnum.DEXPoolDetails]}?address=${pairAddress}`}
      as={`${Routes[RoutesEnum.DEXPoolDetails]}?address=${pairAddress}`}
    >
      <Box
        py="M"
        px="L"
        mb="M"
        display="flex"
        cursor="pointer"
        borderRadius="2.5rem"
        bg="bottomBackground"
        flexDirection="column"
        transition="background-color 1s"
        hover={{ bg: 'textSoft' }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box my="M" display="flex" alignItems="center">
              <FirstIcon width="1.2rem" maxHeight="1.2rem" maxWidth="1.2rem" />
              <SecondIcon width="1.2rem" maxHeight="1.2rem" maxWidth="1.2rem" />
              <Typography mx="M" as="span" variant="normal">
                {symbol0} / {symbol1}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PoolRow;
