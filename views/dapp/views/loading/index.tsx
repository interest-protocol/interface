import { FC } from 'react';

import { Box } from '@/elements';
import { LoadingSVG } from '@/svg';

import Layout from '../../layout';

const Loading: FC = () => (
  <Layout pageTitle="Loading">
    <Box
      mx="auto"
      width="3rem"
      height="100%"
      display="flex"
      alignItems="center"
    >
      <LoadingSVG width="100%" />
    </Box>
  </Layout>
);

export default Loading;
