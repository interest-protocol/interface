import { FC } from 'react';

import Container from '../../../../components/container';
import { LogoSVG } from '../../../../components/svg';
import hooks from '../../../../connectors';
import { Box, Dropdown, Typography } from '../../../../elements';
import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import MobileMenu from './mobile-menu';
import SelectNetwork from './select-network';

const { usePriorityIsActive } = hooks;

const Header: FC = () => {
  const isActive = usePriorityIsActive();

  return (
    <Box as="header" bg="foreground">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <LogoSVG fill="white" width="2.5rem" />
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
          {isActive && <SelectNetwork />}
          {isActive ? <ConnectedWallet /> : <ConnectWallet />}
          <MobileMenu />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
