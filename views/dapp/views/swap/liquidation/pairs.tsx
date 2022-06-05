import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { CheckSVG } from '@/svg';

import { PairsProps } from './liquidation.types';

const Pairs: FC<PairsProps> = ({
  perceptual,
  perceptualSelect,
  type,
  isSelect,
  setSelected,
}) => {
  return (
    <Box
      display="flex"
      border="0.1rem solid"
      borderColor={isSelect ? 'accent' : 'bottomBackground'}
      px="M"
      py="L"
      borderRadius="1rem"
      width="9rem"
      cursor="pointer"
      hover={{
        borderColor: isSelect ? 'accent' : 'textSoft',
      }}
      active={{
        borderColor: 'accent',
      }}
      onClick={() => setSelected(type)}
    >
      <Box>
        <Typography variant="normal" fontWeight="bold">
          {perceptual}%
        </Typography>
        <Typography variant="normal" fontSize="0.8rem" my="M">
          Best for {type} pairs
        </Typography>
        <Typography
          as="span"
          variant="normal"
          fontSize="0.8rem"
          fontWeight="bold"
          bg="bottomBackground"
          px="M"
          py="S"
          borderRadius="1rem"
        >
          {perceptualSelect}% select
        </Typography>
      </Box>
      <Box
        width="1.5rem"
        height="1.2rem"
        bg={isSelect ? 'accent' : 'transparent'}
        borderRadius="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isSelect && <CheckSVG width="1rem" height="1rem" stroke="#fff" />}
      </Box>
    </Box>
  );
};

export default Pairs;
