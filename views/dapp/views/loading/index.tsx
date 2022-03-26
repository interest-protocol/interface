import { FC } from 'react';

import Loading from '../../components/loading';
import Layout from '../../layout';

const LoadingView: FC = () => (
  <Layout pageTitle="Loading">
    <Loading />
  </Layout>
);

export default LoadingView;
