import dynamic from 'next/dynamic';
import { FC } from 'react';

import { Box } from '@/elements';

const DynamicHero = dynamic(() => import('./components/hero'));
const DynamicEarn = dynamic(() => import('./components/earn'));
const DynamicBorrow = dynamic(() => import('./components/borrow'));
const DynamicDEX = dynamic(() => import('./components/dex'));
const DynamicAutomate = dynamic(() => import('./components/automate'));
const DynamicTeam = dynamic(() => import('./components/team'));
const DynamicAdvisors = dynamic(() => import('./components/advisors'));
const DynamicSubscribe = dynamic(() => import('./components/subscribe'));

const Home: FC = () => (
  <>
    <Box
      backgroundImage={[
        'none',
        'radial-gradient(79.4% 64.74% at 12.58% 30.15%, #FFFFFF 0%, #EDEDED 42.71%, #EDEDED 100%)',
      ]}
    >
      <DynamicHero />
      <DynamicEarn />
    </Box>
    <DynamicBorrow />
    <DynamicDEX />
    <DynamicAutomate />
    <DynamicTeam />
    <DynamicAdvisors />
    <DynamicSubscribe />
  </>
);

export default Home;
