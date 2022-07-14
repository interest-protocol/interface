import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Button } from '@/elements';

import SocialMediaCard from '../../components/social-media-card';
import { ItemsNetwork } from './items';
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
          variant="primary"
          onClick={() => push(Routes[RoutesEnum.DApp])}
        >
          DApp
        </Button>
      </Container>
      <MenuItem title="Docs" link={'https://docs.interestprotocol.com/'} />
      <MenuItem title="Network" isDropdowm data={<ItemsNetwork />} />

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
};

export default MenuList;
