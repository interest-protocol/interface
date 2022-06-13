import { FC } from 'react';

import { Box } from '@/elements';

import { ContainerProps } from './container.types';

const Container: FC<ContainerProps> = ({ dapp, large, ...props }) => (
  <Box
    py="M"
    mx="auto"
    px={['L', 'XL']}
    maxWidth={
      dapp ? ['28rem', '28rem', '28rem', large ? '1280px' : '984px'] : '1366px'
    }
    {...props}
  />
);

export default Container;
