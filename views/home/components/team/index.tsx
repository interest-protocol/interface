import { always, toPairs } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { FlipMemberCard } from './team.animation';
import { SOCIAL_SVG, TEAM_MEMBERS } from './team.data';

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
        display="grid"
        mx={['L', 'XXXL']}
        gridRowGap={['2rem', '5rem']}
        gridColumnGap={['3rem', '3rem', '3rem', '7rem']}
        gridTemplateColumns={[
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {TEAM_MEMBERS.map(({ name, role, social, image, bio }) => (
          <Box key={v4()} as="article">
            <FlipMemberCard height={['25rem', '25rem', '25rem', '30rem']}>
              <Box
                width="100%"
                height="100%"
                position="relative"
                className="flipWrapper"
              >
                <Box
                  mb="L"
                  height="100%"
                  overflow="hidden"
                  position="relative"
                  className="flipImage"
                >
                  <img
                    alt={name}
                    src={image}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    decoding="async"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    p="L"
                    pt="XXL"
                    pl="XXL"
                    right="0"
                    bottom="0"
                    width="8rem"
                    position="absolute"
                    backgroundImage="linear-gradient(135deg, #0000 45%, #000A)"
                  >
                    <LogoSVG width="100%" />
                  </Box>
                </Box>
                <Box
                  p="XL"
                  height="100%"
                  display="flex"
                  bg="foreground"
                  overflow="hidden"
                  alignItems="center"
                  className="flipBio"
                  flexDirection="column"
                  border="0.15rem solid"
                  borderColor="outline"
                  borderBottom="0.5rem solid"
                  borderBottomColor="accent"
                >
                  <Box width="4rem">
                    <LogoSVG width="100%" />
                  </Box>
                  <Typography variant="normal" mt="L" lineHeight="1.6">
                    {bio}
                  </Typography>
                </Box>
              </Box>
            </FlipMemberCard>
            <Typography
              as="h3"
              variant="normal"
              fontWeight="bold"
              letterSpacing="1.5px"
              textTransform="uppercase"
            >
              {name}
            </Typography>
            <Typography variant="normal">{role}</Typography>
            <Box mt="M">
              {toPairs(social).map(([network, link]) => {
                const Icon = SOCIAL_SVG[network];
                return (
                  <a href={link} target="_blank" rel="noreferrer" key={v4()}>
                    <Box
                      mx="M"
                      as="span"
                      width="1.6rem"
                      display="inline-block"
                      hover={{
                        color: 'accent',
                      }}
                    >
                      <Icon width="100%" />
                    </Box>
                  </a>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Team;
