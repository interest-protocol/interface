import { FC } from 'react';

import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({
  link,
  Logo,
  title,
  isMenu,
}) => (
  <a href={link} target="__blank" title={title} rel="noopener noreferrer">
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
      <Logo
        height="100%"
        maxWidth={isMenu ? '1.667rem' : '1rem'}
        maxHeight={isMenu ? '1.667rem' : '1rem'}
      />
    </Box>
  </a>
);

export default SocialMediaCard;
