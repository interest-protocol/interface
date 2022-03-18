import { FC, useState } from 'react';

import Container from '../../../../components/container';
import { LogoSVG } from '../../../../components/svg';
import { Box, Dropdown, Typography } from '../../../../elements';
import hooks from '../../../../connectors';
import { walletConnect } from '../../../../connectors/wallet-connect';
import { metaMask } from '../../../../connectors/meta-mask';

const { usePriorityIsActive } = hooks;

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>connect</button>
      {showModal ? (
        <div style={{ color: 'black', marginTop: '2rem' }}>
          <h1>MODAL</h1>
          <button
            onClick={async () => {
              await metaMask.activate();
            }}
          >
            connect with meta mask
          </button>
          <button
            onClick={async () => {
              await walletConnect.activate();
            }}
          >
            connect with wallet connect
          </button>
        </div>
      ) : null}
    </div>
  );
};

const Header: FC = () => {
  const isActive = usePriorityIsActive();

  if (!isActive) return <Modal />;

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
      </Container>
    </Box>
  );
};

export default Header;
