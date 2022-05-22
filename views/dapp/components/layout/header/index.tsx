import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Wallet } from '../../index';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Box
      py="M"
      px={['M', 'L']}
      as="header"
      bg="foreground"
      alignItems="center"
      justifyContent="space-between"
      display={['flex', 'flex', 'grid']}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      <Box display="flex" alignItems="center">
        <Link href={Routes[RoutesEnum.Home]}>
          <Box
            color="text"
            cursor="pointer"
            hover={{ color: 'accent' }}
            active={{ color: 'accentSecondary' }}
          >
            <LogoSVG
              width="2.5rem"
              height="2.5rem"
              aria-label="Logo"
              fill="currentColor"
            />
          </Box>
        </Link>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        display={['none', 'none', 'flex']}
      >
        <Link href={Routes[RoutesEnum.Earn]}>
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
          >
            Earn
          </Typography>
        </Link>
        <Box>
          <Dropdown
            title={
              <Typography
                px="XL"
                cursor="pointer"
                variant="normal"
                borderRight="1px solid"
                borderColor="bottomBackground"
                color={
                  pathname === Routes[RoutesEnum.DApp] ||
                  pathname.includes(Routes[RoutesEnum.Borrow])
                    ? 'accent'
                    : 'inherit'
                }
                hover={{ color: 'accentActive' }}
              >
                Borrow
              </Typography>
            }
            mode="menu"
            data={[
              {
                value: 'dinero-market',
                displayOption: 'Dinero Market',
                onSelect: () =>
                  push(Routes[RoutesEnum.DApp], undefined, {
                    shallow: true,
                  }),
              },
              {
                value: 'mail-market',
                displayOption: 'MAIL Market',
                onSelect: () =>
                  push(Routes[RoutesEnum.MAILMarket], undefined, {
                    shallow: true,
                  }),
              },
            ]}
          />
        </Box>
        <a href="https://forms.gle/aDP4wHvshLPKkKv97" target="__blank">
          <Typography
            px="L"
            py="M"
            width="100%"
            fontSize="S"
            variant="normal"
            borderRadius="M"
            textAlign="center"
            bg="accentAlternative"
            hover={{
              bg: 'warning',
            }}
          >
            Feedback
          </Typography>
        </a>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Wallet />
        <MobileMenu />
      </Box>
    </Box>
  );
};

export default Header;
