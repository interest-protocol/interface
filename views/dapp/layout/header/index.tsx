import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Wallet } from '../../components';
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
      display={['flex', 'flex', 'grid']}
      justifyContent="space-between"
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
            <LogoSVG fill="currentColor" width="2.5rem" aria-label="Logo" />
          </Box>
        </Link>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        display={['none', 'none', 'flex']}
      >
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
        <Box px="XL">
          <Dropdown
            mode="menu"
            title={
              <Typography
                as="span"
                variant="normal"
                color={
                  pathname.includes(Routes[RoutesEnum.NFTLoans])
                    ? 'accent'
                    : 'inherit'
                }
                hover={{
                  color: 'accentActive',
                }}
              >
                NFT Loans
              </Typography>
            }
            data={[
              {
                value: 'borrow',
                displayOption: 'Borrow',
                onSelect: () => push(Routes[RoutesEnum.NFTBorrow]),
              },
              {
                value: 'lend',
                displayOption: 'Lend',
                onSelect: () => push(Routes[RoutesEnum.NFTLend]),
              },
            ]}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Wallet />
        <MobileMenu />
      </Box>
    </Box>
  );
};

export default Header;
