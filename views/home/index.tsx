import { FC } from 'react';

import { Box } from '@/elements';

import {
  Automate,
  Borrow,
  DEX,
  Earn,
  Hero,
  Subscribe,
  Team,
} from './components';
<<<<<<< HEAD
=======
import Layout from './layout';
>>>>>>> 0e0825b (🔥 feat: team section (#129))

const Home: FC = () => (
  <>
    <Box
      backgroundImage={[
        'none',
        'radial-gradient(79.4% 64.74% at 12.58% 30.15%, #FFFFFF 0%, #EDEDED 42.71%, #EDEDED 100%)',
      ]}
    >
      <Hero />
      <Earn />
    </Box>
    <Borrow />
    <DEX />
    <Automate />
    <Team />
    <Subscribe />
  </>
);

export default Home;
