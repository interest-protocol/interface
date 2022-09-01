import { always } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';

import { TEAM_MEMBERS } from './team.data';

const Team: FC = always(
  <Box bg="foreground">
    <Container as="section" py={['XL', 'XXL']} textAlign="center">
      <Typography
        as="h2"
        variant="normal"
        fontWeight="900"
        textAlign="center"
        lineHeight="4.876rem"
        fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
      >
        Meet Our Team
      </Typography>
      <Typography
        my="XL"
        mx="auto"
        maxWidth="70ch"
        variant="normal"
        pb={['L', 'XL']}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat
        mollitia error. Aspernatur ipsam totam laboriosam numquam? Officiis
        expedita sint illo praesentium laboriosam sapiente nostrum autem labore
        fugit, quod rerum?
      </Typography>
      <Box
        pt="XL"
        mx={['L', 'XXXL']}
        display="grid"
        gridRowGap={['2rem', '5rem']}
        gridColumnGap={['3rem', '7rem']}
        gridTemplateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        {TEAM_MEMBERS.map(({ name, role }) => (
          <Box key={v4()}>
            <img
              alt="cube"
              width="100%"
              loading="lazy"
              decoding="async"
              src="https://thispersondoesnotexist.com/image"
            />

            <Typography variant="normal">{name}</Typography>
            <Typography variant="normal">{role}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Team;
