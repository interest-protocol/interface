import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '../../../../components/container';
import { Box, Typography } from '../../../../elements';
import { OPPORTUNITIES_DATA } from './opportunities.data';
import OpportunitiesCard from './opportunities-card';

const Opportunities: FC = () => (
  <Box bg="bottomBackground">
    <Container py="XXXL">
      <Typography as="h2" variant="title2" textAlign={['center', 'left']}>
        Opportunities
      </Typography>
      <Box
        mt="XL"
        display="grid"
        rowGap={['1rem', '3rem']}
        columnGap="3rem"
        alignItems="start"
        mx={['NONE', 'XL']}
        gridTemplateColumns={['1fr', '1fr 1fr']}
      >
        {OPPORTUNITIES_DATA.map((opportunity) => (
          <OpportunitiesCard {...opportunity} key={v4()} />
        ))}
      </Box>
    </Container>
  </Box>
);

export default Opportunities;
