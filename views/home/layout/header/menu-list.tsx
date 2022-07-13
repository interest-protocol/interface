import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Button } from '@/elements';

import SocialMediaCard from '../../components/social-media-card';
import { ItemsCommunity, ItemsNetwork } from './items';
import MenuItem from './menu-item';

const MenuList: FC = () => {
  const { push } = useRouter();

  return (
    <Box
      as="nav"
      display={['flex', 'none']}
      bg="textInverted"
      flexDirection={['column', 'row']}
      py="2.5rem"
      width="100%"
    >
      <Container width="100%" cursor="pointer">
        <Button
          type="button"
          effect="hover"
          variant="secondary"
          onClick={() => push(Routes[RoutesEnum.DApp])}
        >
          DApp
        </Button>
      </Container>
      <MenuItem title="Docs" link={'https://docs.interestprotocol.com/'} />
      <MenuItem title="Network" isDropdowm data={<ItemsNetwork />} />
      <MenuItem title="Community" isDropdowm data={<ItemsCommunity />} />

      <Container
        width="100%"
        display="flex"
        my={['L', 'NONE']}
        alignItems="center"
        justifyContent="space-between"
      >
        {SOCIAL_MEDIAS.map((socialMediaData) => (
          <SocialMediaCard {...socialMediaData} key={v4()} />
        ))}
      </Container>
    </Box>
  );
};

export default MenuList;
