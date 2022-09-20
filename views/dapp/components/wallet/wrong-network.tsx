import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { NetworkSVG } from '@/svg';

import { WrongNetworkModal } from './wallet-modal';

const WrongNetwork: FC = () => {
  const t = useTranslations();
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
        <Box as="span" display="inline-block" width="1rem">
          <NetworkSVG width="100%" />
        </Box>
        <Typography as="span" variant="normal" ml="M">
          {t('error.networkTitle')}
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
