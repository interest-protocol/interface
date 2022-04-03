import { FC } from 'react';

import primitiveColors from '@/design-system/common/primitive-colors';
import { Box } from '@/elements';

import { SocialMediaCardProps } from './social-media-card.types';

const SocialMediaCard: FC<SocialMediaCardProps> = ({ title, link, Logo }) => (
  <a href={link} target="__blank" title={title}>
    <Box
      mx="M"
      effect="hover"
      display="flex"
      width="2.6rem"
      height="2.6rem"
      border="1px solid"
      borderRadius="50%"
      alignItems="center"
      borderColor="outline"
      justifyContent="center"
      bg={primitiveColors.NEUTRAL_100}
      boxShadow="0px 5px 10px -5px #AEC0EA"
    >
      <Logo width="1.1rem" height="1.1rem" />
    </Box>
  </a>
);

export default SocialMediaCard;
