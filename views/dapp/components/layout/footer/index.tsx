import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
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
import { capitalize } from '@/utils';

import Faucet from '../../faucet';

const Footer: FC = () => {
  const t = useTranslations();
  const { pathname, push } = useRouter();

  return (
    <Box
      zIndex={3}
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
      id="footer"
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
              px="0.8rem"
              fontSize="M"
              height="2.5rem"
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

          <Box borderRight="1px solid" borderColor="bottomBackground" px="XL">
            <Dropdown
              bottom
              title={
                <Typography
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
                    pathname === Routes[RoutesEnum.Earn] ||
                    pathname.includes(Routes[RoutesEnum.Vault])
                      ? 'accent'
                      : 'inherit'
                  }
                  hover={{ bg: 'accent', color: 'text' }}
                  active={{ bg: 'accentActive', color: 'text' }}
                >
                  {capitalize(t('common.earn'))}
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
          </Box>
          <Link href={Routes[RoutesEnum.DineroMarket]}>
            <Button
              mx="S"
              as="div"
              px="0.8rem"
              fontSize="M"
              height="2.5rem"
              display="flex"
              variant="primary"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 15px rgba(0,0,0,.3)"
              bg={
                pathname.includes(Routes[RoutesEnum.DineroMarket])
                  ? 'accent'
                  : 'textSoft'
              }
              hover={{ bg: 'accent', color: 'text' }}
              active={{ bg: 'accentActive', color: 'text' }}
            >
              {capitalize(t('common.borrow'))}
            </Button>
          </Link>
          {RoutesWithFaucet.includes(pathname) && <Faucet />}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
