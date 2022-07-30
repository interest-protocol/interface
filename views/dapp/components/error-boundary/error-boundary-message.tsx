import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';
import { BoxProps } from '@/elements/box/box.types';

import { BoundaryMessageProps } from './error-boundary.types';

const ErrorMessageStyle = {
  margin: '3rem 0',
};

const Container: FC<BoxProps> = (props) => (
  <Box
    color="text"
    height="100vh"
    display="flex"
    bg="background"
    minWidth="31rem"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    {...props}
  />
);

const GoHome = () => (
  <Link href={Routes[RoutesEnum.DApp]}>
    <Button as="div" variant="primary">
      Back Home
    </Button>
  </Link>
);

const BoundaryMessage: FC<BoundaryMessageProps> = ({ error }) => (
  <Container>
    <Typography
      as="h2"
      variant="title3"
      maxWidth="20rem"
      textTransform="capitalize"
    >
      {error?.name}
    </Typography>
    <Typography variant="normal" style={ErrorMessageStyle} maxWidth="25rem">
      {error?.message}
    </Typography>
    <GoHome />
  </Container>
);

export default BoundaryMessage;
