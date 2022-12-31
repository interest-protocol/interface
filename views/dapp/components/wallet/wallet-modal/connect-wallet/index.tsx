import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Modal, Typography } from '@/elements';
import { TimesSVG } from '@/svg';
import { capitalize } from '@/utils';

import { ConnectWalletProps } from '../../wallet.types';

const ConnectWalletModal: FC<ConnectWalletProps> = ({
  showModal,
  toggleModal,
}) => {
  const t = useTranslations();

  return (
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
        minHeight="15rem"
        flexDirection="column"
      >
        <Box
          mb="L"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography as="h3" color="text" variant="normal" fontWeight="normal">
            {capitalize(t('common.connectYourWallet'))}
          </Typography>
          <Box
            cursor="pointer"
            color="textSecondary"
            onClick={toggleModal}
            hover={{ color: 'text' }}
          >
            <TimesSVG
              width="1.8rem"
              height="1.8rem"
              maxHeight="1.8rem"
              maxWidth="1.8rem"
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
