import { FC } from 'react';

import { Box } from '@/elements';

import { ContainerProps } from './container.types';

const Container: FC<ContainerProps> = ({
  dapp,
  side,
  large,
  dividedBy = 1,
  ...props
}) => (
  <Box
    py="M"
    mx="auto"
    {...(side ? (side === 'left' ? { mr: 'NONE' } : { ml: 'NONE' }) : {})}
    px={['L', 'XL']}
    maxWidth={
      dapp
        ? [
            '28rem',
            '28rem',
            '28rem',
            large ? `${1280 / dividedBy}px` : `${984 / dividedBy}px`,
          ]
        : ['100%', '100%', '100%', `${1440 / dividedBy}px`]
    }
    {...props}
  />
);

export default Container;
