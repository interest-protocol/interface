import { FC } from 'react';

import { BorrowTable } from './components';
import Layout from './layout';

const DApp: FC = () => (
  <Layout pageTitle="Dapp">
    <BorrowTable />
  </Layout>
);

export default DApp;
