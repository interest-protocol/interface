import Link from 'next/link';
import React, { FC } from 'react';

import { Layout, Logo } from '../../components';
import { Routes, RoutesEnum } from '../../constants/routes';
import { Box, Button, Typography } from '../../elements';

const Home: FC = () => (
  <Layout>
    <Box
      bg="background"
      p="XXXL"
      borderRadius="S"
      borderTopRightRadius="0"
      borderTopLeftRadius="0"
    >
      <Logo />
      <Typography variant="title1" as="h1">
        Home
      </Typography>
      <Link href={Routes[RoutesEnum.Home]}>
        <Button variant="primary">Goto To Other Page &rarr; </Button>
      </Link>
    </Box>
  </Layout>
);

export default Home;
