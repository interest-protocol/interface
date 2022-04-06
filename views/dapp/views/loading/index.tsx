import { FC } from 'react';

import Layout from '../../components/layout';
import Loading from '../../components/loading';

const LoadingView: FC = () => (
  <Layout pageTitle="Loading">
    <Loading />
  </Layout>
);

export default LoadingView;
