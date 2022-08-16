import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { DineroSVG } from '@/svg';

import { BorrowTable } from './components';

const DApp: FC = () => (
  <Container
    dapp
    width="100%"
    height="100%"
    display="flex"
    flexDirection="column"
  >
    <Box
      py="XL"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent={['center', 'flex-start']}
    >
      <DineroSVG width="2rem" height="2rem" />
      <Typography variant="normal" ml="M">
        Borrow Dinero
      </Typography>
    </Box>
    <BorrowTable />
  </Container>
);

export default DApp;
