import { FC, useState } from 'react';

import { Button, Typography } from '@/elements';
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
    <>
      <Button
        variant="primary"
        bg="bottomBackground"
        onClick={toggleModal}
        hover={{ bg: 'accent' }}
        active={{ bg: 'accentActive' }}
      >
        <Typography as="span" variant="normal" whiteSpace="nowrap" fontSize="S">
          Connect Wallet
        </Typography>
      </Button>
      <ConnectWalletModal showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default ConnectWallet;
