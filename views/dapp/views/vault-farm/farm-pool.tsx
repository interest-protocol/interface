import { FC, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import VaultFarmDetailsItem from './farm-detail-item';
import { VaultFarmPoolProps } from './vault-farm.types';

const AnimatedBox = animated(Box);

const VaultFarmPool: FC<VaultFarmPoolProps> = ({ VaultPoolDetails }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const { arrowInvert } = useSpring({
    from: {
      arrowInvert: 'scaleY(1)',
    },
    to: {
      arrowInvert: !openDetails ? 'scaleY(1)' : 'scaleY(-1)',
    },
    config: {
      duration: 500,
    },
  });

  return (
    <>
      <Box
        height="4rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={() => setOpenDetails(!openDetails)}
      >
        <Typography
          variant="normal"
          color="textSecondary"
          mr="M"
          fontSize="0.9rem"
        >
          {openDetails ? 'Hide ' : 'Details '}
        </Typography>
        <AnimatedBox style={{ transform: arrowInvert }}>
          <ArrowSVG width="0.5rem" />
        </AnimatedBox>
      </Box>
      {openDetails && (
        <Box p="0 2rem 2rem" cursor="default">
          <Box bg="background" p="1.5rem" borderRadius="0.5rem">
            {VaultPoolDetails.map((item) => (
              <VaultFarmDetailsItem
                {...item}
                fontSize="0.8rem"
                color="textSecondary"
                key={v4()}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default VaultFarmPool;
