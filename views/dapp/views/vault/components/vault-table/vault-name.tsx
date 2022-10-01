import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { VaultNameProps } from '../../vault.types';

const VaultName: FC<VaultNameProps> = ({ vault, caption }) => {
  const returnSVG = (symbol: string) => {
    const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
    return (
      <SVG
        width={vault?.length == 1 ? '100%' : '80%'}
        height={vault?.length == 1 ? '100%' : '80%'}
      />
    );
  };

  return (
    <Box display="flex">
      <Box width="2.5rem" height="2.5rem" my="auto">
        {vault?.length == 1 ? (
          returnSVG(vault?.[0].symbol)
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
              {returnSVG(vault?.[0].symbol)}
            </Box>
            <Box
              position="absolute"
              right="0.5rem"
              bottom="-0.5rem"
              width="100%"
              key={v4()}
            >
              {returnSVG(vault?.[1].symbol)}
            </Box>
          </Box>
        )}
      </Box>
      <Box ml="S">
        <Typography
          variant="normal"
          color="textSecondary"
          as="p"
          fontSize="0.75rem"
          fontWeight="400"
        >
          {caption}
        </Typography>
        <Typography
          variant="normal"
          fontSize="1.125rem"
          textTransform="uppercase"
          lineHeight="1.313rem"
          fontWeight="500"
          mt="M"
        >
          {vault?.length == 1
            ? vault?.[0].symbol
            : vault?.[0].symbol + '-' + vault?.[1].symbol}
        </Typography>
      </Box>
    </Box>
  );
};

export default VaultName;
