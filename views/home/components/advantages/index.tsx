import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '../../../../components/container';
import { Box } from '../../../../elements';
import { ADVANTAGES_DATA } from './advantages.data';
import AdvantagesCard from './advantages-card';

const Advantages: FC = () => (
  <Container as="section">
    <Box
      display="grid"
      rowGap="2rem"
      columnGap="3rem"
      px={['L', 'XXXL']}
      mx={['S', 'XXXL']}
      py={['XXL', 'XXXL']}
      gridTemplateColumns={['1fr', '§1fr 1fr 1fr']}
    >
      {ADVANTAGES_DATA.map((advantage) => (
        <AdvantagesCard key={v4()}>{advantage}</AdvantagesCard>
      ))}
    </Box>
  </Container>
);

export default Advantages;
