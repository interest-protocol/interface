import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container, SocialMediaCard } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Button, Dropdown, Typography } from '@/elements';
import { GitBookSVG } from '@/svg';

const Footer: FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Box
      width="100%"
      py={['L', 'L', 'XL']}
      bg={['background', 'background', 'foreground']}
    >
      <Container dapp>
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
                  : 'foreground'
              }
              hover={{ bg: 'accent' }}
              active={{ bg: 'accentActive' }}
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
                  fontSize="M"
                  width="8rem"
                  height="3rem"
                  display="flex"
                  bg="foreground"
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
                  hover={{ bg: 'accent' }}
                  active={{ bg: 'accentActive' }}
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
      </Container>
    </Box>
  );
};
export default Footer;
