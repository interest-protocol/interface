import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { UnknownCoinSVG } from '@/svg';

import { PoolRowProps } from './pool.types';

const PoolRow: FC<PoolRowProps> = ({ symbol0, symbol1, pairAddress }) => {
  const FirstIcon = UnknownCoinSVG;
  const SecondIcon = UnknownCoinSVG;

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
        borderRadius="0.8rem"
        bg="bottomBackground"
        flexDirection="column"
        hover={{ bg: 'textSoft' }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" mb="M">
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
