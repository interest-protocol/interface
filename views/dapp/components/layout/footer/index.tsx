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

  const customAction = RoutesWithFaucet[pathname];

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
          <Link href={Routes[RoutesEnum.Earn]}>
            <Button
              p="0"
              mx="S"
              fontSize="M"
              width="8rem"
              height="3rem"
              variant="primary"
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
                  p="0"
                  mx="S"
                  px="XL"
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
                    pathname === Routes[RoutesEnum.DApp] ||
                    pathname.includes(Routes[RoutesEnum.Borrow])
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
          {!!customAction && <Faucet customAction={customAction} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
