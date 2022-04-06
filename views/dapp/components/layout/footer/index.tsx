import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container, SocialMediaCard } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { SOCIAL_MEDIAS } from '@/constants/social-media.data';
import { Box, Button, Dropdown } from '@/elements';
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
          <Link href={Routes[RoutesEnum.DApp]}>
            <Button
              p="0"
              mx="S"
              fontSize="M"
              width="8rem"
              height="3rem"
              variant="primary"
              boxShadow="0 0 15px rgba(0,0,0,.3)"
              bg={
                pathname === Routes[RoutesEnum.DApp] ||
                pathname.includes(Routes[RoutesEnum.Borrow])
                  ? 'accent'
                  : 'foreground'
              }
              hover={{ bg: 'accent' }}
              active={{ bg: 'accentActive' }}
            >
              Borrow
            </Button>
          </Link>
          <Dropdown
            bottom
            mode="menu"
            minWidth="10rem"
            title={
              <Button
                p="0"
                mx="S"
                fontSize="M"
                width="8rem"
                height="3rem"
                variant="primary"
                boxShadow="0 0 15px rgba(0,0,0,.3)"
                bg={
                  pathname.includes(Routes[RoutesEnum.NFTLoans])
                    ? 'accent'
                    : 'foreground'
                }
                hover={{ bg: 'accent' }}
                active={{ bg: 'accentActive' }}
              >
                NFT Loans
              </Button>
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
      </Container>
    </Box>
  );
};
export default Footer;
