import { ethers } from 'ethers';
import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { CHAIN_ID } from '@/sdk';

import { TokenViewProps } from './token-view.types';

const TokenView: FC<TokenViewProps> = ({ symbol, address, isColumn }) => {
  const chainId = useChainId();

  const SVG = TOKENS_SVG_MAP[chainId]
    ? TOKENS_SVG_MAP[chainId][ethers.utils.getAddress(address)]
    : TOKENS_SVG_MAP[CHAIN_ID.BNB_TEST_NET].default;

  return (
    <Box
      display="flex"
      flexDirection={[
        'column',
        'column',
        'column',
        isColumn ? 'column' : 'row',
      ]}
      alignItems="center"
    >
      <Box
        width={isColumn ? '1.8rem' : '1.5rem'}
        height={isColumn ? '1.8rem' : '1.5rem'}
        my="auto"
      >
        <SVG width="100%" height="100%" />
      </Box>
      <Box
        ml={isColumn ? 'unset' : 'M'}
        mt={['M', 'M', 'M', isColumn ? 'M' : 'unset']}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
          variant="normal"
          textTransform="uppercase"
          lineHeight="1.313rem"
          fontWeight="500"
        >
          {symbol}
        </Typography>
      </Box>
    </Box>
  );
};

export default TokenView;
