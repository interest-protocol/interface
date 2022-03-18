import { FC } from 'react';

import Container from '../../../../components/container';
import { LogoSVG } from '../../../../components/svg';
import { Box, Dropdown, Typography } from '../../../../elements';
import useWallet from '../../../../hooks/use-wallet';
import HeaderNetworkDropdown from './header-network-dropdown';
import HeaderWalletDropdown from './header-wallet-dropdown';

const Header: FC = () => {
  const { accountData } = useWallet();

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
          <Box mr="L">
            {accountData?.connected && <HeaderNetworkDropdown />}
          </Box>
          <HeaderWalletDropdown />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
