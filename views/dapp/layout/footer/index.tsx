import { Container, SocialMediaCard } from '@components';
import { SOCIAL_MEDIAS } from '@constants/social-media.data';
import { Box } from '@elements';
import { GitBookSVG } from '@svg';
import { FC } from 'react';
import { v4 } from 'uuid';

const Footer: FC = () => (
  <Box bg="foreground" py={['L', 'XL']}>
    <Container display="flex" justifyContent="center">
      {[
        ...SOCIAL_MEDIAS,
        {
          title: 'Docs',
          Logo: GitBookSVG,
          link: 'https://docs.interestprotocol.com/',
        },
      ].map((item) => (
        <SocialMediaCard key={v4()} {...item} />
      ))}
    </Container>
  </Box>
);

export default Footer;
