import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container, SocialMediaCard } from '@/components';
import {
  Routes,
  RoutesEnum,
  RoutesWithFaucet,
  SOCIAL_MEDIAS,
} from '@/constants';
import { Box, Button, Dropdown, Typography } from '@/elements';
import { GitBookSVG } from '@/svg';

import Faucet from '../../faucet';

const Footer: FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Box
      zIndex={2}
      as="footer"
      width="100%"
      boxShadow="0 0 0.5rem #0003"
      bottom={['0', '0', '0', 'unset']}
      pt={['NONE', 'NONE', 'NONE', 'XL']}
      pb={[
        'env(safe-area-inset-bottom)',
        'env(safe-area-inset-bottom)',
        'env(safe-area-inset-bottom)',
        'XL',
      ]}
      position={['fixed', 'fixed', 'fixed', 'static']}
      bg={['foreground', 'foreground', 'foreground', 'foreground']}
    >
      <Container dapp width="100%">
        <Box display={['none', 'none', 'flex']} justifyContent="center">
          {[
            ...SOCIAL_MEDIAS,
            {
              title: 'Docs',
              Logo: GitBookSVG,
              link: 'https://docs.interestprotocol.com/',
            },
          ].map((item) => (
            <SocialMediaCard key={v4()} {...item} />
          ))}
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          display={['flex', 'flex', 'none']}
        >
          <Link href={Routes[RoutesEnum.DEX]}>
            <Button
              mx="S"
              as="div"
              px="1.5rem"
              fontSize="M"
              height="3rem"
              display="flex"
              variant="primary"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 15px rgba(0,0,0,.3)"
              bg={
                pathname.includes(Routes[RoutesEnum.DEX])
                  ? 'accent'
                  : 'textSoft'
              }
              hover={{ bg: 'accent', color: 'text' }}
              active={{ bg: 'accentActive', color: 'text' }}
            >
              Dex
            </Button>
          </Link>
          <Link href={Routes[RoutesEnum.Earn]}>
            <Button
              mx="S"
              as="div"
              px="1.5rem"
              fontSize="M"
              height="3rem"
              display="flex"
              variant="primary"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 15px rgba(0,0,0,.3)"
              bg={
                pathname.includes(Routes[RoutesEnum.Earn])
                  ? 'accent'
                  : 'textSoft'
              }
              hover={{ bg: 'accent', color: 'text' }}
              active={{ bg: 'accentActive', color: 'text' }}
            >
              Earn
            </Button>
          </Link>
          <Box>
            <Dropdown
              bottom
              mode="menu"
              title={
                <Typography
                  mx="S"
                  px="1.5rem"
                  bg="textSoft"
                  fontSize="M"
                  height="3rem"
                  display="flex"
                  variant="normal"
                  borderRadius="M"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 15px rgba(0,0,0,.3)"
                  color={
                    pathname === Routes[RoutesEnum.DineroMarket] ||
                    pathname.includes(Routes[RoutesEnum.DineroMarket])
                      ? 'accent'
                      : 'inherit'
                  }
                  hover={{ bg: 'accent', color: 'text' }}
                  active={{ bg: 'accentActive', color: 'text' }}
                >
                  Borrow
                </Typography>
              }
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
          {RoutesWithFaucet.includes(pathname) && <Faucet />}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
