import React, { FC } from 'react';

import Layout from '../../layout';
import { Hero } from './components';
import Advantages from './components/advantages';
import Opportunities from './components/opportunities';

const Home: FC = () => (
  <Layout>
    <Hero />
    <Advantages />
    <Opportunities />
  </Layout>
);

export default Home;
