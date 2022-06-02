import { FC } from 'react';

import { Container } from '@/components';
import { Typography } from '@/elements';

import { SwapHeaderProps } from '../faucet.types';

const SwapHeader: FC<SwapHeaderProps> = ({ description }) => (
  <Container
    dapp
    py="XL"
    px="NONE"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent={['center', 'flex-start']}
  >
    <Typography variant="normal">{description}</Typography>
  </Container>
);

export default SwapHeader;
