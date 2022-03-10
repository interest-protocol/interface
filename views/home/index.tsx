import React, { FC } from 'react';

import Layout from '../../layout';
import { Hero } from './components';
import Advantages from './components/advantages';

const Home: FC = () => (
  <Layout>
    <Hero />
    <Advantages />
  </Layout>
);

export default Home;
