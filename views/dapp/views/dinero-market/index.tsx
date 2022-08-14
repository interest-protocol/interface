import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { DineroSVG } from '@/svg';

import { BorrowTable, LPBorrowTable } from './components';

const DApp: FC = () => (
  <Container dapp display="flex" flexDirection="column" height="100%">
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
    <LPBorrowTable />
  </Container>
);

export default DApp;
