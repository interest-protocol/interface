import React, { FC } from 'react';

import Layout from '../../layout';
import { Advantages, Enjoy, Hero, Opportunities } from './components';

const Home: FC = () => (
  <Layout>
    <Hero />
    <Advantages />
    <Opportunities />
    <Enjoy />
  </Layout>
);

export default Home;
