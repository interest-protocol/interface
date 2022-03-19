import { FC, SVGAttributes, useState } from 'react';

import { MetaMaskSVG, TimesSVG, WalletSVG } from '../../../../components/svg';
import { metaMask } from '../../../../connectors/meta-mask';
import { walletConnect } from '../../../../connectors/wallet-connect';
import { Box, Button, Modal, Typography } from '../../../../elements';

const WalletButton: FC<{
  name: string;
  onClick: () => Promise<void>;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}> = ({ onClick, name, Icon }) => (
  <Box
    p="L"
    mb="M"
    color="text"
    display="flex"
    borderRadius="M"
    alignItems="center"
    bg="bottomBackground"
    justifyContent="space-between"
    onClick={onClick}
  >
    {name}
    <Box width="2rem" height="2rem" display="flex" alignItems="center">
      <Icon width="2rem" />
    </Box>
  </Box>
);

const ConnectWallet: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);

  return (
    <Box>
      <Button variant="special" onClick={toggleModal}>
        Connect Wallet
      </Button>
      <Modal
        background="#000A"
        modalProps={{
          isOpen: showModal,
          shouldCloseOnEsc: true,
          onRequestClose: toggleModal,
          shouldCloseOnOverlayClick: true,
        }}
      >
        <Box
          p="L"
          pb="NONE"
          width="20rem"
          border="none"
          display="flex"
          bg="foreground"
          borderRadius="L"
          maxHeight="80vh"
          minHeight="20rem"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              as="h3"
              color="text"
              variant="normal"
              fontWeight="normal"
            >
              Connect Your Wallet
            </Typography>
            <Box onClick={toggleModal} cursor="pointer">
              <TimesSVG width="1.8rem" />
            </Box>
          </Box>
          <Box mt="L">
            <WalletButton
              name="MetaMask"
              Icon={MetaMaskSVG}
              onClick={async () => await metaMask.activate()}
            />
            <WalletButton
              Icon={WalletSVG}
              name="Wallet Connect"
              onClick={async () => await walletConnect.activate()}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConnectWallet;
