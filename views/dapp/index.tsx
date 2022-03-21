import Container from 'components/container';
import { FC } from 'react';

import { BorrowTable } from './components';
import Layout from './layout';

const DApp: FC = () => (
  <Layout pageTitle="Dapp">
    <Container>
      <BorrowTable />
    </Container>
  </Layout>
);

export default DApp;
