import { FC } from 'react';

import { Box } from '../../elements';
import { ContainerProps } from './container.types';

const Container: FC<ContainerProps> = ({ dapp, ...props }) => (
  <Box
    py="M"
    mx="auto"
    px={['L', 'XL']}
    maxWidth={dapp ? ['28rem', '28rem', '28rem', '984px'] : '1366px'}
    {...props}
  />
);

export default Container;
