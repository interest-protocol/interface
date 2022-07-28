import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { VaultNameProps } from '../../vault.types';

const VaultName: FC<VaultNameProps> = ({ vault, caption, isAuto }) => {
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
      <Box width="1.5rem" height="2rem" my="auto">
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
            <Box position="absolute" bottom="0" width="100%" key={v4()}>
              {returnSVG(vault?.[1].symbol)}
            </Box>
          </Box>
        )}
      </Box>
      <Box ml="L">
        <Typography
          variant="normal"
          color="textSecondary"
          as="p"
          fontSize="0.7rem"
          fontWeight="400"
        >
          {isAuto && (
            <Typography
              variant="normal"
              as="span"
              mr="M"
              fontSize="0.525rem"
              fontWeight="500"
              p="0.06rem 0.25rem"
              bg="accent"
              color="text"
              borderRadius="0.25rem"
            >
              auto
            </Typography>
          )}
          {caption}
        </Typography>
        <Typography
          variant="normal"
          fontSize="0.85rem"
          textTransform="uppercase"
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
