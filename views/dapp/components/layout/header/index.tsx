import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { SwitchLang } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Wallet } from '../..';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const t = useTranslations();
  const { pathname, push } = useRouter();

  return (
    <Box
      py="M"
      as="header"
      bg="foreground"
      px={['M', 'L']}
      alignItems="center"
      justifyContent="space-between"
      display={['flex', 'flex', 'grid']}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      <Box display="flex" alignItems="center">
        <Link href={Routes[RoutesEnum.Home]}>
          <Box
            mr="L"
            color="text"
            width="2.5rem"
            height="2.5rem"
            cursor="pointer"
            hover={{ color: 'accent' }}
            active={{ color: 'accentSecondary' }}
          >
            <LogoSVG width="100%" aria-label="Logo" fill="currentColor" />
          </Box>
        </Link>
        <a href="https://forms.gle/aDP4wHvshLPKkKv97" target="__blank">
          <Typography
            ml="L"
            px="L"
            py="M"
            width="100%"
            fontSize="S"
            variant="normal"
            borderRadius="M"
            textAlign="center"
            bg="accentAlternative"
            display={['none', 'none', 'none', 'block']}
            hover={{
              bg: 'warning',
            }}
          >
            Feedback
          </Typography>
        </a>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        display={['none', 'none', 'flex']}
      >
        <Link href={Routes[RoutesEnum.DEX]}>
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            borderRight="1px solid"
            borderColor="bottomBackground"
            color={
              pathname.includes(Routes[RoutesEnum.DEX]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentActive' }}
          >
            DEX
          </Typography>
        </Link>
        <Dropdown
          title={
            <Typography
              px="XL"
              cursor="pointer"
              variant="normal"
              color={
                pathname === Routes[RoutesEnum.Earn] ||
                pathname.includes(Routes[RoutesEnum.Vault])
                  ? 'accent'
                  : 'inherit'
              }
              hover={{ color: 'accentActive' }}
            >
              {t('common.earn')}
            </Typography>
          }
          mode="menu"
          data={[
            {
              value: 'Farm',
              displayOption: 'Farm',
              onSelect: () =>
                push(Routes[RoutesEnum.Earn], undefined, {
                  shallow: true,
                }),
            },
            {
              value: 'Vaults',
              displayOption: 'Vaults',
              onSelect: () =>
                push(Routes[RoutesEnum.Vault], undefined, {
                  shallow: true,
                }),
            },
          ]}
        />
        <Link href={Routes[RoutesEnum.DineroMarket]}>
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            color={
              pathname.includes(Routes[RoutesEnum.DineroMarket])
                ? 'accent'
                : 'inherit'
            }
            hover={{ color: 'accentActive' }}
            textTransform="capitalize"
          >
            {t('common.borrow')}
          </Typography>
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Wallet />
        <SwitchLang />
        <MobileMenu />
      </Box>
    </Box>
  );
};

export default Header;
