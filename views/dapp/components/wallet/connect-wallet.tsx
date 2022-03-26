import { FC, useState } from 'react';

import { Box, Button } from '@/elements';

import { ConnectWalletModal } from './wallet-modal';

const ConnectWallet: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);

  return (
    <Box>
      <Button
        variant="primary"
        bg="bottomBackground"
        onClick={toggleModal}
        hover={{ bg: 'accent' }}
        active={{ bg: 'accentActive' }}
      >
        Connect Wallet
      </Button>
      <ConnectWalletModal showModal={showModal} toggleModal={toggleModal} />
    </Box>
  );
};

export default ConnectWallet;
