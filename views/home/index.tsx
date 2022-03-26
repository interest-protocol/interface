import React, { FC } from 'react';

import {
  Advantages,
  Enjoy,
  Hero,
  Opportunities,
  RoadMap,
  Subscribe,
} from './components';
import Layout from './layout';

const Home: FC = () => (
  <Layout>
    <Hero />
    <Advantages />
    <Opportunities />
    <Enjoy />
    <RoadMap />
    <Subscribe />
  </Layout>
);

export default Home;
