import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { SOCIAL_MEDIAS } from '@/constants';
import { Box, Typography } from '@/elements';

export const ItemsCommunity: FC = () => (
  <Box bg="background" pt="1.625rem" mt="1.5rem">
    <Container display="grid" cursor="pointer" gridTemplateColumns="1fr 1fr">
      {SOCIAL_MEDIAS.map((socialMediaData) => (
        <a
          href={socialMediaData.link}
          target="__blank"
          title={socialMediaData.title}
          key={v4()}
        >
          <Box
            display="flex"
            effect="hover"
            height="1.5rem"
            alignItems="center"
            mb="1.2rem"
          >
            <socialMediaData.Logo height="1rem" />
            <Typography variant="normal" ml="M">
              {socialMediaData.title}
            </Typography>
          </Box>
        </a>
      ))}
    </Container>
  </Box>
);

export const ItemsNetwork: FC = () => (
  <Box bg="background" pt="1.625rem" mt="1.5rem" width="100vw">
    <Container>
      <a href="https://ethereum.org/en/" target="__blank" title="Networks">
        <Typography variant="large" mb="1rem">
          https://ethereum.org/en/
        </Typography>
      </a>
      <a href="https://www.binance.com/" target="__blank" title="Networks">
        <Typography variant="large" mb="1.625rem">
          https://www.binance.com/
        </Typography>
      </a>
    </Container>
  </Box>
);
