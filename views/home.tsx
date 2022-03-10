import Link from 'next/link';
import React, { FC } from 'react';

import { Layout, Logo } from '../components';
import { Routes, RoutesEnum } from '../constants/routes';
import { View } from '../elements';

const Home: FC = () => (
  <Layout pageTitle="Home">
    <View
      bg="background"
      p="XXXL"
      borderRadius="S"
      borderTopRightRadius="0"
      borderTopLeftRadius="0"
    >
      <Logo />
      <h1>Home</h1>
      <Link href={Routes[RoutesEnum.Home]}>Goto To Other Page &rarr; </Link>
    </View>
  </Layout>
);

export default Home;
