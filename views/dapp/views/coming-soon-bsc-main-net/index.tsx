import { FC } from 'react';

import { Pulse } from '@/components';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import Layout from '../../components/layout';

const ComingSoonBSCMainNet: FC = () => (
  <Layout>
    <Box
      width="100vw"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Pulse>
        <Box display="flex" flexDirection="column" alignItems="center">
          <LogoSVG width="6rem" height="6rem" />
          <Typography variant="title2" mt="L">
            Coming Soon
          </Typography>
          <Typography variant="normal" mt="M">
            Sorry, we are working on <strong>BSC Main Net</strong>.
          </Typography>
          <Typography variant="normal" mt="M">
            Please, switch to <strong>BSC Test Net</strong>.
          </Typography>
        </Box>
      </Pulse>
    </Box>
  </Layout>
);

export default ComingSoonBSCMainNet;
