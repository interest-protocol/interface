import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box } from '@/elements';

import SocialMediaCard from '../../components/social-media-card';
import { MenuListProps } from './header.types';
import { ItemsNetwork } from './items';
import MenuItem from './menu-item';

const MenuList: FC<MenuListProps> = ({ id }) => (
  <Box
    as="nav"
    display={['flex', 'none']}
    bg="textInverted"
    flexDirection={['column', 'row']}
    pt="2.5rem"
    pb="1.875rem"
    width="100%"
  >
    <MenuItem title="DApp" link={Routes[RoutesEnum.DApp]} />
    <MenuItem title="Docs" link={'https://docs.interestprotocol.com/'} />
    <MenuItem title="Networks" isDropdown data={<ItemsNetwork />} id={id} />
    <Box
      width="100%"
      display="flex"
      my={['L', 'NONE']}
      alignItems="center"
      justifyContent="space-between"
      px="1.625rem"
      flexWrap="wrap"
    >
      {SOCIAL_MEDIAS.map((socialMediaData) => (
        <SocialMediaCard {...socialMediaData} isMenu key={v4()} />
      ))}
    </Box>
  </Box>
);

export default MenuList;
