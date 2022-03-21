import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { Container } from '@/components';
import hooks from '@/connectors';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID, getChainId } from '@/sdk/chains';
import { LogoSVG } from '@/svg';
import { switchToNetwork } from '@/utils/web3-provider';

import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import MobileMenu from './mobile-menu';
import SelectNetwork from './select-network';

const {
  usePriorityIsActive,
  usePriorityChainId,
  usePriorityIsActivating,
  usePriorityConnector,
} = hooks;

const Header: FC = () => {
  const { pathname, push } = useRouter();
  const [isSwitchingNetworks, setIsSwitchingNetworks] = useState(false);
  const [failedSwitchingNetwork, setFailedSwitchingNetwork] = useState(false);

  const isActive = usePriorityIsActive();
  const isActivating = usePriorityIsActivating();
  const chainId = usePriorityChainId();
  const connector = usePriorityConnector();

  const switchNetwork = useCallback(
    async (x: CHAIN_ID): Promise<void> => {
      try {
        if (!connector) return;
        setIsSwitchingNetworks(true);
        await switchToNetwork(connector, x);
        setIsSwitchingNetworks(false);
      } catch {
        setIsSwitchingNetworks(false);
        setFailedSwitchingNetwork(true);
      }
    },
    [connector]
  );

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
          {(isActive || isActivating) && getChainId(chainId ?? 0) !== 0 && (
            <SelectNetwork switchNetwork={switchNetwork} />
          )}
          {isActive || isActivating ? (
            <ConnectedWallet
              isSwitchingNetworks={isSwitchingNetworks}
              failedSwitchingNetwork={failedSwitchingNetwork}
            />
          ) : (
            <ConnectWallet />
          )}
          <MobileMenu />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
