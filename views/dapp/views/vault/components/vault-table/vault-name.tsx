import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { useChainId } from '@/hooks';

import { VaultNameProps } from '../../vault.types';

const VaultName: FC<VaultNameProps> = ({ vault }) => {
  const chainId = useChainId();

  console.log(vault, 'see vault');

  const returnSVG = (address: string) => {
    const SVG =
      TOKENS_SVG_MAP[chainId][address] || TOKENS_SVG_MAP[chainId].default;
    return (
      <SVG
        width={vault?.length == 1 ? '100%' : '80%'}
        height={vault?.length == 1 ? '100%' : '80%'}
      />
    );
  };

  return (
    <Box display="flex">
      <Box width="1.5rem" height="1.5rem" my="auto">
        {vault?.length == 1 ? (
          returnSVG(vault?.[0]?.address)
        ) : (
          <Box position="relative" width="100%" height="100%">
            <Box
              position="absolute"
              right="0"
              width="100%"
              key={v4()}
              display="flex"
              justifyContent="flex-end"
            >
              {returnSVG(vault?.[0]?.address)}
            </Box>
            <Box
              position="absolute"
              right="0.5rem"
              bottom="-0.5rem"
              width="100%"
              key={v4()}
            >
              {returnSVG(vault?.[1].address)}
            </Box>
          </Box>
        )}
      </Box>
      <Box ml="S" display="flex" justifyContent="center" flexDirection="column">
        <Typography
          variant="normal"
          textTransform="uppercase"
          lineHeight="1.313rem"
          fontWeight="500"
        >
          {vault?.length == 1
            ? vault?.[0]?.symbol
            : vault?.[0]?.symbol + '-' + vault?.[1].symbol}
        </Typography>
      </Box>
    </Box>
  );
};

export default VaultName;
