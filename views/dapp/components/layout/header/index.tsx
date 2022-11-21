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
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Dropdown, Typography } from '@/elements';
import useEventListener from '@/hooks/use-event-listener';
import { CreditCardSVG, LogoSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logEvent } from '@/utils/analytics';

import { Wallet } from '../..';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const t = useTranslations();
  const { pathname, push } = useRouter();
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
    logEvent(GACategory.HeaderNavigation, GAAction.DesktopNavigate, label);

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
            color="text"
            width="2.5rem"
            height="2.5rem"
            maxWidth="50px"
            maxHeight="50px"
            cursor="pointer"
            hover={{ color: 'accent' }}
            active={{ color: 'accentSecondary' }}
          >
            <LogoSVG width="100%" aria-label="Logo" fill="currentColor" />
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
        <Box borderRight="1px solid" borderColor="bottomBackground" px="XL">
          <Dropdown
            title={
              <Typography
                textAlign="center"
                cursor="pointer"
                variant="normal"
                color={
                  pathname === Routes[RoutesEnum.Farms] ||
                  pathname.includes(Routes[RoutesEnum.Vaults]) ||
                  pathname.includes(Routes[RoutesEnum.DineroVault])
                    ? 'accent'
                    : 'inherit'
                }
                hover={{ color: 'accentActive' }}
              >
                {capitalize(t('common.earn'))}
              </Typography>
            }
            mode="menu"
            data={[
              {
                value: 'Farms',
                displayOption: 'Farms',
                onSelect: () => push(Routes[RoutesEnum.Farms]),
              },
              {
                value: 'Vaults',
                displayOption: 'Vaults',
                onSelect: () => push(Routes[RoutesEnum.Vaults]),
              },
            ]}
          />
        </Box>
        <Box pl="XL">
          <Dropdown
            title={
              <Typography
                textAlign="center"
                cursor="pointer"
                variant="normal"
                color={
                  pathname.includes(Routes[RoutesEnum.DineroMarket]) ||
                  pathname.includes(Routes[RoutesEnum.SyntheticsMarket])
                    ? 'accent'
                    : 'inherit'
                }
                hover={{ color: 'accentActive' }}
              >
                {capitalize(t('common.market'))}
              </Typography>
            }
            mode="menu"
            data={[
              {
                value: 'dinero',
                displayOption: capitalize(t('common.dinero')),
                onSelect: () => push(Routes[RoutesEnum.DineroMarket]),
              },
              {
                value: 'synths',
                displayOption: capitalize(t('common.synthetics')),
                onSelect: () => push(Routes[RoutesEnum.SyntheticsMarket]),
              },
            ]}
          />
        </Box>
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
                <CreditCardSVG width="100%" />
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
