import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Wallet } from '../../components';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Box as="header" bg="foreground">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Link href={Routes[RoutesEnum.Home]}>
            <Box>
              <LogoSVG fill="white" width="2.5rem" aria-label="Logo" />
            </Box>
          </Link>
          <Box display={['none', 'flex']} alignItems="center">
            <Typography
              px="XL"
              variant="normal"
              borderRight="1px solid"
              borderColor="bottomBackground"
              color={
                pathname === Routes[RoutesEnum.DApp] ? 'accent' : 'inherit'
              }
            >
              Borrow
            </Typography>
            <Box px="XL">
              <Dropdown
                mode="menu"
                title={
                  <Typography
                    variant="normal"
                    color={
                      pathname.includes(Routes[RoutesEnum.Loans])
                        ? 'accent'
                        : 'inherit'
                    }
                  >
                    NFT Loans
                  </Typography>
                }
                data={[
                  {
                    value: 'borrow',
                    displayOption: 'Borrow',
                    onSelect: () => push(Routes[RoutesEnum.Borrow]),
                  },
                  {
                    value: 'lend',
                    displayOption: 'Lend',
                    onSelect: () => push(Routes[RoutesEnum.Lend]),
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex">
          <Wallet />
          <MobileMenu />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
