import { FC } from 'react';

import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({ title, link, Logo }) => (
  <a href={link} target="__blank" title={title}>
    <Box
      width="2rem"
      display="flex"
      height="1.5rem"
      alignItems="center"
      justifyContent="center"
      transition="all 0.3s ease-in-out"
      hover={{
        transform: 'scale(1.2)',
      }}
    >
      <Logo height="100%" />
    </Box>
  </a>
);

export default SocialMediaCard;
