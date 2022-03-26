import { FC } from 'react';

import Advertising from '../../components/advertising';
import Layout from '../../layout';

const ComingSoonBSCMainNet: FC = () => (
  <Layout>
    <Advertising
      title="Coming Soon"
      lines={[
        <>
          Sorry, we are working on <strong>BSC Main Net</strong>.
        </>,
        <>
          Please, switch to <strong>BSC Test Net</strong>.
        </>,
      ]}
    />
  </Layout>
);

export default ComingSoonBSCMainNet;
