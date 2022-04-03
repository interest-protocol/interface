import { FC, useState } from 'react';

import { Button, Typography } from '@/elements';
import { NetworkSVG } from '@/svg';

import { WrongNetworkModal } from './wallet-modal';

const WrongNetwork: FC = () => {
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);

  const toggleNetworkModal = () => setShowNetworkModal((state) => !state);

  return (
    <>
      <Button
        bg="error"
        display="flex"
        variant="primary"
        alignItems="center"
        onClick={toggleNetworkModal}
      >
        <NetworkSVG width="1rem" height="1rem" />
        <Typography as="span" variant="normal" ml="M">
          Wrong Network
        </Typography>
      </Button>
      <WrongNetworkModal
        isOpen={showNetworkModal}
        handleClose={toggleNetworkModal}
      />
    </>
  );
};

export default WrongNetwork;
