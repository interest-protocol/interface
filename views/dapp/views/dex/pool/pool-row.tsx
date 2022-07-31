import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { replaceWrappedNativeTokenWithNativeTokenSymbol } from '@/utils';

import { PoolRowProps } from './pool.types';

const PoolRow: FC<PoolRowProps> = ({ symbol0, symbol1, pairAddress }) => {
  // Visually we want to abstract the Wrapped Native Token mechanism
  const FirstIcon =
    TOKENS_SVG_MAP[replaceWrappedNativeTokenWithNativeTokenSymbol(symbol0)] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const SecondIcon =
    TOKENS_SVG_MAP[replaceWrappedNativeTokenWithNativeTokenSymbol(symbol1)] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Link
      shallow
      href={Routes[RoutesEnum.DEXPoolDetails]}
      as={`${Routes[RoutesEnum.DEXPool]}/${pairAddress}/`}
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
                {replaceWrappedNativeTokenWithNativeTokenSymbol(symbol0)} /{' '}
                {replaceWrappedNativeTokenWithNativeTokenSymbol(symbol1)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PoolRow;
