import { FC } from 'react';

import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({
  title,
  link,
  Logo,
  isMenu,
}) => (
  <a href={link} target="__blank" title={title}>
    <Box
      width={isMenu ? '1.667rem' : '1rem'}
      display="flex"
      height={isMenu ? '1.667rem' : '1rem'}
      alignItems="center"
      justifyContent="center"
      transition="all 0.3s ease-in-out"
      mr={['unset', 'unset', 'unset', '0.938rem']}
      hover={{
        transform: 'scale(1.2)',
      }}
    >
      <Logo height="100%" />
    </Box>
  </a>
);

export default SocialMediaCard;
