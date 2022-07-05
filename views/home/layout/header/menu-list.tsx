import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box } from '@/elements';

import SocialMediaCard from '../../components/social-media-card';
import { ItemsCommunity, ItemsNetwork } from './items';
import MenuItem from './menu-item';

const MenuList: FC = () => {
  return (
    <Box
      as="nav"
      display={['flex', 'none']}
      bg="textInverted"
      flexDirection={['column', 'row']}
      py="2.5rem"
      width="100%"
    >
      <MenuItem title="DApp" link={Routes[RoutesEnum.DApp]} />
      <MenuItem title="Docs" link={'/'} />
      <MenuItem title="NetWork" isDropdowm data={<ItemsNetwork />} />
      <MenuItem title="Community" isDropdowm data={<ItemsCommunity />} />

      <Box
        width="100%"
        display="flex"
        my={['L', 'NONE']}
        alignItems="center"
        justifyContent="space-between"
      >
        {SOCIAL_MEDIAS.map((socialMediaData) => (
          <SocialMediaCard {...socialMediaData} key={v4()} />
        ))}
      </Box>
    </Box>
  );
};

export default MenuList;
