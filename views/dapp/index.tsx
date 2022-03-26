import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable } from './components';
import Faucet from './components/faucet';
import Layout from './layout';

const DApp: FC = () => (
  <Layout pageTitle="Dapp">
    <Box display="flex" flexDirection="column" height="100%">
      <BorrowTable />
      <Faucet />
    </Box>
  </Layout>
);

export default DApp;
