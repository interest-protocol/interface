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
      width={length == 1 ? '2rem' : '1.3rem'}
      height={length == 1 ? '2rem' : '1.3rem'}
    />
  );
  return (
    <Box height="5.5rem" p="1.5rem 0" display="flex">
      <Box width="2rem" height="2rem" my="auto">
        {Icons.length == 1 ? (
          getToken(Icons[0], Icons.length)
        ) : (
          <Box position="relative" width="100%" height="100%">
            <Box position="absolute" right="0" key={v4()}>
              {getToken(Icons[0], Icons.length)}
            </Box>
            <Box position="absolute" bottom="0" key={v4()}>
              {getToken(Icons[1], Icons.length)}
            </Box>
          </Box>
        )}
      </Box>
      <Box ml="M">
        <Typography
          variant="normal"
          color="textSecondary"
          as="p"
          fontSize="0.8rem"
          fontWeight="400"
        >
          {isAuto && (
            <Typography
              variant="normal"
              as="span"
              mr="M"
              fontSize="0.625rem"
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
          fontSize="1.125rem"
          fontWeight="500"
          lineHeight="1.313rem"
          mt="S"
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default VaultName;
