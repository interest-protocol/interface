import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { SwitchLang } from '@/components';
import {
  isChainIdSupported,
  makeFIATWidgetURL,
  Routes,
  RoutesEnum,
} from '@/constants';
import { Box, Typography } from '@/elements';
import useEventListener from '@/hooks/use-event-listener';
import { CreditCardSVG, LogoSVG } from '@/svg';
import { logGenericEvent } from '@/utils/analytics';

import { Wallet } from '../..';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const t = useTranslations();
  const { pathname } = useRouter();
  const { chain } = useNetwork();
  const { address } = useAccount();

  const chainId = chain?.id ?? -1;

  const [isMobile, setIsMobile] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 64em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  const trackHeaderNavigation = (label: string) => () =>
    logGenericEvent(`Desktop_Header_${label}`);

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
        <Link
          href={Routes[RoutesEnum.Home]}
          onClick={trackHeaderNavigation(RoutesEnum.Home)}
        >
          <Box
            mr="L"
            color="accent"
            width="2.5rem"
            height="2.5rem"
            maxWidth="50px"
            maxHeight="50px"
            cursor="pointer"
            hover={{ color: 'accent' }}
            active={{ color: 'accentSecondary' }}
          >
            <LogoSVG
              maxHeight="2.5rem"
              maxWidth="2.5rem"
              width="100%"
              aria-label="Logo"
              fill="currentColor"
            />
          </Box>
        </Link>
        <a
          href="https://forms.gle/aDP4wHvshLPKkKv97"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Typography
            ml="L"
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
        <Link
          href={Routes[RoutesEnum.DEX]}
          onClick={trackHeaderNavigation(RoutesEnum.DEX)}
        >
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            color={
              pathname.includes(Routes[RoutesEnum.DEX]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentActive' }}
          >
            DEX
          </Typography>
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="stretch">
        {address && isChainIdSupported(chainId ?? -1) && (
          <Box display={['none', 'none', 'block']}>
            <a
              href={makeFIATWidgetURL(chainId, address)}
              target="__blank"
              onClick={trackHeaderNavigation(
                makeFIATWidgetURL(chainId, address)
              )}
              rel="noopener noreferrer"
            >
              <Box
                mr="S"
                as="span"
                p="0.7rem"
                width="3rem"
                height="2.8rem"
                borderRadius="M"
                alignItems="center"
                display="inline-flex"
                bg="bottomBackground"
                justifyContent="center"
              >
                <CreditCardSVG width="100%" maxHeight="3rem" maxWidth="3rem" />
              </Box>
            </a>
          </Box>
        )}
        <Wallet />
        <Box display="flex" alignItems="stretch">
          <SwitchLang />
        </Box>
        {isMobile && <MobileMenu />}
      </Box>
    </Box>
  );
};

export default Header;
