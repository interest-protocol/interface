import Link from 'next/link';
import { FC } from 'react';

import { Container } from '@/components';
import hooks from '@/connectors';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Dropdown, Typography } from '@/elements';
import { getChainId } from '@/sdk/chains';
import { LogoSVG } from '@/svg';

import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import MobileMenu from './mobile-menu';
import SelectNetwork from './select-network';

const { usePriorityIsActive, usePriorityChainId, usePriorityIsActivating } =
  hooks;
const Header: FC = () => {
  const chainId = usePriorityChainId();
  const isActive = usePriorityIsActive();
  const isActivating = usePriorityIsActivating();

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
              variant="normal"
              px="XL"
              borderRight="1px solid"
              borderColor="bottomBackground"
            >
              Borrow
            </Typography>
            <Box px="XL">
              <Dropdown
                mode="menu"
                title="NFT Loans"
                data={[
                  { value: 'borrow', displayOption: 'Borrow' },
                  { value: 'lend', displayOption: 'Lend' },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex">
          {(isActive || isActivating) && getChainId(chainId ?? 0) !== 0 && (
            <SelectNetwork />
          )}
          {isActive || isActivating ? <ConnectedWallet /> : <ConnectWallet />}
          <MobileMenu />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
