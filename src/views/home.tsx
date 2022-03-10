import React, { FC } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={Routes[RoutesEnum.OtherPage]}>Goto To Other Page &rarr; </Link>
    </View>
  </Layout>
);

export default Home;
