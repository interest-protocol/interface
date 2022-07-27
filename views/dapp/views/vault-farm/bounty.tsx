import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { InfoSVG, InterestTokenSVG } from '@/svg';

const Bounty: FC = () => {
  return (
    <Box p="1.5rem 2rem 0rem">
      <Box
        borderRadius="0.5rem"
        display="flex"
        justifyContent="space-between"
        border="0.06rem solid"
        borderColor="textSoft"
        p="1rem 1.5rem"
        bg="blue"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bg="red"
        >
          <Typography
            variant="normal"
            fontSize="1rem"
            fontWeight="600"
            color="accent"
          >
            Fee Distribution Bounty
            <Box
              data-tip="Fee Distribution Bounty"
              as="span"
              ml="S"
              pt="M"
              cursor="help"
            >
              <InfoSVG width="1rem" height="1rem" />
            </Box>
          </Typography>
          <Box display="flex" pt="0.5rem">
            <InterestTokenSVG width="1.5rem" height="1.5rem" />
            <Typography
              variant="normal"
              fontWeight="500"
              fontSize="1rem"
              mx="0.3rem"
            >
              0.0000
              <Typography
                variant="normal"
                as="span"
                fontSize="0.8rem"
                fontWeight="500"
                ml="M"
                color="textSecondary"
              >
                ~0.000 USD
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Button variant="primary">CLAIM</Button>
      </Box>
    </Box>
  );
};

export default Bounty;
