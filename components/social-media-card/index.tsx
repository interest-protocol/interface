import { FC } from 'react';

import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({ title, link, Logo }) => (
  <a href={link} target="__blank" title={title}>
    <Box
      mx="0.75rem"
      effect="hover"
      display="flex"
      width="1rem"
      height="1rem"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
    >
      <Logo width="100%" height="100%" />
    </Box>
  </a>
);

export default SocialMediaCard;
