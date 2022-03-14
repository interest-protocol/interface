import React, { FC } from 'react';

import Layout from '../../layout';
import {
  Advantages,
  Enjoy,
  Hero,
  Opportunities,
  RoadMap,
  Subscribe,
} from './components';

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
