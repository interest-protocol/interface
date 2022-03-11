import React, { FC } from 'react';

import Layout from '../../layout';
import { Advantages, Enjoy, Hero, Opportunities, RoadMap } from './components';

const Home: FC = () => (
  <Layout>
    <Hero />
    <Advantages />
    <Opportunities />
    <Enjoy />
    <RoadMap />
  </Layout>
);

export default Home;
