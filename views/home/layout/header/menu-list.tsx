import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import {
  Routes,
  RoutesEnum,
  SOCIAL_MEDIAS,
  SOCIAL_MEDIAS_PT,
} from '@/constants';
import { LocalesEnum } from '@/constants/locale';
import { Box } from '@/elements';
import { useLocale } from '@/hooks';
import { capitalize } from '@/utils';

import SocialMediaCard from '../../components/social-media-card';
import { MenuListProps } from './header.types';
import { ItemsNetwork } from './items';
import MenuItem from './menu-item';

const MenuList: FC<MenuListProps> = ({ id }) => {
  const { currentLocale } = useLocale();
  const t = useTranslations();
  return (
    <Box
      as="nav"
      display={['flex', 'flex', 'none', 'none']}
      bg="textInverted"
      flexDirection={['column', 'column', 'row', 'row']}
      pt="2.5rem"
      pb="1.875rem"
      width="100%"
    >
      <MenuItem title="DApp" link={Routes[RoutesEnum.DApp]} />
      <MenuItem
        title={capitalize(t('common.docs'))}
        link={'https://docs.interestprotocol.com/'}
      />
      <MenuItem
        title={capitalize(t('common.network', { count: 2 }))}
        isDropdown
        data={<ItemsNetwork />}
        id={id}
      />
      <Box
        width="100%"
        display="flex"
        my={['L', 'L', 'NONE', 'NONE']}
        alignItems="center"
        justifyContent="space-between"
        px="1.625rem"
        flexWrap="wrap"
      >
        {(currentLocale === LocalesEnum.EN
          ? SOCIAL_MEDIAS
          : SOCIAL_MEDIAS_PT
        ).map((socialMediaData) => (
          <SocialMediaCard {...socialMediaData} isMenu key={v4()} />
        ))}
      </Box>
    </Box>
  );
};

export default MenuList;
