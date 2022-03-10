import { FC } from 'react';

import { Box } from '../../elements';
import { ContainerProps } from './container.types';

const Container: FC<ContainerProps> = (props) => (
  <Box maxWidth="1366px" mx="auto" p="M" {...props} />
);

export default Container;
