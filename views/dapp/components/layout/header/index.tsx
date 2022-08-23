import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { LogoSVG } from '@/svg';

import { Wallet } from '../../index';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const { locales, locale, asPath, pathname, push } = useRouter();
  const LANG = ['English', 'Português'];

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
                  pathname === Routes[RoutesEnum.DineroMarket] ||
                  pathname.includes(Routes[RoutesEnum.DineroMarketBorrow]) ||
                  pathname.includes(Routes[RoutesEnum.DineroMarketRepay])
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
                  push(Routes[RoutesEnum.DineroMarket], undefined, {
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
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Wallet />
        <MobileMenu />
        <Dropdown
          title={
            <Typography
              mx="0.75rem"
              variant="normal"
              className={locale == 'en-US' ? 'fi fi-us' : 'fi fi-pt'}
            />
          }
          mode="menu"
          defaultValue={locale}
          data={
            locales?.map((l, i) => ({
              value: l,
              displayOption: (
                <Box pl="M">
                  <Typography
                    variant="normal"
                    className={l == 'en-US' ? 'fi fi-us' : 'fi fi-pt'}
                    mr="M"
                  />
                  {LANG[i]}
                </Box>
              ),
              onSelect: () =>
                push(asPath, undefined, {
                  shallow: true,
                  locale: l,
                }),
            })) as unknown as ReadonlyArray<IDropdownData>
          }
        />
      </Box>
    </Box>
  );
};

export default Header;
