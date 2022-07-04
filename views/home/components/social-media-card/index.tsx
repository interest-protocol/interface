import { FC } from 'react';

import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({ title, link, Logo }) => (
  <a href={link} target="__blank" title={title}>
    <Box
      mx="M"
      width="2rem"
      display="flex"
      effect="hover"
      height="1.5rem"
      alignItems="center"
      justifyContent="center"
    >
      <Logo height="1rem" />
    </Box>
  </a>
);

export default SocialMediaCard;
