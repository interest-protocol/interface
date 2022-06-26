import { FC, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { Box, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import VaultFarmDetailsItem from './farm-detail-item';

const AnimatedBox = animated(Box);

const VaultFarmPool: FC = () => {
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
        <Box p="0 2rem 2rem">
          <Box bg="background" p="1.5rem" borderRadius="0.5rem">
            <VaultFarmDetailsItem
              title="Earn"
              content="BUNNY"
              fontSize="0.8rem"
              color="textSecondary"
            />
            <VaultFarmDetailsItem
              title="Platform"
              content="Bunny"
              fontSize="0.8rem"
              color="textSecondary"
            />
            <VaultFarmDetailsItem
              title="TVL"
              content="$461,952.79"
              fontSize="0.8rem"
              color="textSecondary"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default VaultFarmPool;
