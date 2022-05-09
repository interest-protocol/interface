import { FC } from 'react';

import { Container } from '@/components';
import { Typography } from '@/elements';

const EarnHeader: FC = () => (
  <Container
    dapp
    py="XL"
    px="NONE"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent={['center', 'flex-start']}
  >
    <Typography variant="normal">EARN</Typography>
  </Container>
);
export default EarnHeader;
