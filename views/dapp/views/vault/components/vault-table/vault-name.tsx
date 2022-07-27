import { FC, SVGAttributes } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import { VaultNameProps } from '../../vault.types';

const VaultName: FC<VaultNameProps> = ({ Icons, caption, name, isAuto }) => {
  const getToken = (
    Token: FC<SVGAttributes<SVGSVGElement>>,
    length: number
  ) => (
    <Token
      width={length == 1 ? '100%' : '80%'}
      height={length == 1 ? '100%' : '80%'}
    />
  );
  return (
    <Box height="2rem" display="flex">
      <Box width="1.5rem" height="100%" my="auto">
        {Icons?.length == 1 ? (
          getToken(Icons?.[0], Icons?.length)
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
              {getToken(Icons?.[0], Icons?.length)}
            </Box>
            <Box position="absolute" bottom="0" width="100%" key={v4()}>
              {getToken(Icons?.[1], Icons?.length)}
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
        <Typography variant="normal" fontSize="0.85rem" fontWeight="500" mt="M">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default VaultName;
