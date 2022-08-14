import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';

const MAILMarket: FC = () => {
  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container dapp px="M" background="specialBackground" width="100%">
          <Box mt="XL" display="flex" justifyContent="space-between">
            <Typography variant="normal" ml="M">
              Multi-asset Isolated Lending Markets
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MAILMarket;
