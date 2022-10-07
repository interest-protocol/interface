import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { event } from 'react-ga';

import { SwitchLang } from '@/components';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Wallet } from '../..';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const t = useTranslations();
  const { pathname } = useRouter();

  const trackHeaderNavigation = (action: GAAction, label: string) => () =>
    event({
      label,
      action,
      category: GACategory.HeaderNavigation,
    });

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
        <Link
          href={Routes[RoutesEnum.Home]}
          onClick={trackHeaderNavigation(GAAction.Access, RoutesEnum.Home)}
        >
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
        <a
          href="https://forms.gle/aDP4wHvshLPKkKv97"
          target="__blank"
          onClick={trackHeaderNavigation(GAAction.Access, 'feedback')}
        >
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
        <Link
          href={Routes[RoutesEnum.DEX]}
          onClick={trackHeaderNavigation(GAAction.Access, RoutesEnum.DEX)}
        >
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
        <Link
          href={Routes[RoutesEnum.Earn]}
          onClick={trackHeaderNavigation(GAAction.Access, RoutesEnum.Earn)}
        >
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            borderRight="1px solid"
            borderColor="bottomBackground"
            color={
              pathname.includes(Routes[RoutesEnum.Earn]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentActive' }}
            textTransform="capitalize"
          >
            {t('common.earn')}
          </Typography>
        </Link>
        <Link
          href={Routes[RoutesEnum.DineroMarket]}
          onClick={trackHeaderNavigation(
            GAAction.Access,
            RoutesEnum.DineroMarket
          )}
        >
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
