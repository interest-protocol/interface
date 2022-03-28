import { FC, useState } from 'react';

import { Box, Button } from '@/elements';
import { useIsMounted } from '@/hooks/use-is-mounted';

import { ConnectWalletModal } from './wallet-modal';

const ConnectWallet: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const isMounted = useIsMounted();

  const toggleModal = () => {
    if (!isMounted.current) return;
    setShowModal((state) => !state);
  };

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
