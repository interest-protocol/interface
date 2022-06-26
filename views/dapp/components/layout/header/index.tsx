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
            mr="XL"
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
        <Link href={Routes[RoutesEnum.Vault]}>
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            borderRight="1px solid"
            borderColor="bottomBackground"
            color={
              pathname.includes(Routes[RoutesEnum.Vault]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentActive' }}
          >
            Vault
          </Typography>
        </Link>
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
              {
                disabled: true,
                value: 'pair-market',
                displayOption: (
                  <Box
                    px="L"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="normal">Pair Market</Typography>
                    <Typography
                      py="S"
                      px="M"
                      fontSize="S"
                      borderRadius="L"
                      variant="normal"
                      fontWeight="500"
                      bg="accentAlternative"
                      textTransform="uppercase"
                    >
                      Soon
                    </Typography>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Wallet />
        <MobileMenu />
      </Box>
    </Box>
  );
};

export default Header;
