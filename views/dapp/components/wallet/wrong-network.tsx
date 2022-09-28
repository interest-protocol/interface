import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
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
        px={['M', 'L']}
        variant="primary"
        alignItems="center"
        onClick={toggleNetworkModal}
      >
        <Box as="span" display="inline-block" width="1rem">
          <NetworkSVG width="100%" />
        </Box>
        <Typography as="span" variant="normal" ml="M" fontSize={['S', 'M']}>
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
