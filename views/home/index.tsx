import { FC } from 'react';

import { Box } from '@/elements';

import {
  Advisors,
  Automate,
  Borrow,
  DEX,
  Diversity,
  Earn,
  Hero,
  Integrations,
  Subscribe,
  Team,
  WhyUs,
} from './components';

const Home: FC = () => (
  <>
    <Box
      backgroundImage={[
        'none',
        'radial-gradient(79.4% 64.74% at 12.58% 30.15%, #FFFFFF 0%, #EDEDED 42.71%, #EDEDED 60%, #FFF0 100%)',
      ]}
    >
      <Hero />
      <WhyUs />
    </Box>
    <Box
      backgroundImage={[
        'none',
        'linear-gradient(114.19deg, #FFFFFF 10.09%, #EBEBEB 95.77%);',
      ]}
    >
      <Diversity />
      <Earn />
    </Box>
    <Borrow />
    <DEX />
    <Automate />
    <Team />
    <Advisors />
    <Integrations />
    <Subscribe />
  </>
);

export default Home;
