import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';
import { useAccount, useNetwork } from 'wagmi';

import { Container, SocialMediaCard } from '@/components';
import {
  isChainIdSupported,
  makeFIATWidgetURL,
  Routes,
  RoutesEnum,
  RoutesWithFaucet,
  SOCIAL_MEDIAS,
} from '@/constants';
import { Box, Button, Dropdown, Typography } from '@/elements';
import { CreditCardSVG, FaucetSVG, GitBookSVG, HorizontalDotsSVG } from '@/svg';
import { capitalize, noop } from '@/utils';

const Footer: FC = () => {
  const t = useTranslations();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { pathname, push } = useRouter();

  const chainId = chain?.id ?? -1;

  const supportsFaucet = RoutesWithFaucet.includes(pathname);
  const supportsCreditCard = address && isChainIdSupported(chainId ?? -1);

  return (
    <Box
      zIndex={3}
      as="footer"
      id="footer"
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
          <Link href={Routes[RoutesEnum.Earn]}>
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
                pathname.includes(Routes[RoutesEnum.Earn])
                  ? 'accent'
                  : 'textSoft'
              }
              hover={{ bg: 'accent', color: 'text' }}
              active={{ bg: 'accentActive', color: 'text' }}
            >
              {capitalize(t('common.earn'))}
            </Button>
          </Link>
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
          {(supportsCreditCard || supportsFaucet) && (
            <Dropdown
              bottom
              title={
                <Typography
                  width="2.5rem"
                  height="2.5rem"
                  display="flex"
                  variant="normal"
                  alignItems="center"
                  borderRadius="2rem"
                  bg="accentAlternative"
                  justifyContent="center"
                  hover={{ bg: 'accentAlternativeActive' }}
                >
                  <Box
                    as="span"
                    color="text"
                    width="1.3rem"
                    alignItems="center"
                    display="inline-flex"
                  >
                    <HorizontalDotsSVG width="100%" />
                  </Box>
                </Typography>
              }
              mode="menu"
              data={(supportsFaucet
                ? [
                    {
                      value: 'faucet',
                      displayOption: (
                        <>
                          <Box
                            mr="M"
                            ml="L"
                            as="span"
                            width="1.3rem"
                            display="inline-block"
                          >
                            <FaucetSVG width="100%" />
                          </Box>
                          <Typography variant="normal">Faucet</Typography>
                        </>
                      ),
                      onSelect: () => {
                        push(Routes[RoutesEnum.Faucet]);
                      },
                    },
                  ]
                : []
              ).concat(
                supportsCreditCard
                  ? [
                      {
                        value: 'credit-card',
                        displayOption: (
                          <a
                            href={makeFIATWidgetURL(chainId, address)}
                            target="__blank"
                            rel="noopener noreferrer"
                          >
                            <Box display="flex">
                              <Box
                                mr="M"
                                ml="L"
                                as="span"
                                width="1.3rem"
                                display="inline-block"
                              >
                                <CreditCardSVG width="100%" />
                              </Box>
                              <Typography variant="normal">
                                Credit Card
                              </Typography>
                            </Box>
                          </a>
                        ),
                        onSelect: noop,
                      },
                    ]
                  : []
              )}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
