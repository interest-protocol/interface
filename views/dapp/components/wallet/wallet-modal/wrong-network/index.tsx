import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Modal, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import { InfoModalProps } from '../../wallet.types';

const WrongNetworkModal: FC<InfoModalProps> = ({ isOpen, handleClose }) => {
  const t = useTranslations();

  return (
    <Modal
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        shouldCloseOnOverlayClick: true,
        onRequestClose: handleClose,
      }}
      background="#0008"
    >
      <Box p="L" width="100%" bg="foreground" maxWidth="23rem" borderRadius="L">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography as="h3" color="text" variant="normal" fontWeight="normal">
            {t('wallet.wrongNetwork.title')}
          </Typography>
          <Box
            onClick={handleClose}
            cursor="pointer"
            color="textSecondary"
            hover={{ color: 'text' }}
          >
            <TimesSVG width="1.8rem" height="1.8rem" />
          </Box>
        </Box>
        <Typography my="M" fontSize="S" variant="normal" color="textSecondary">
          {t('wallet.wrongNetwork.advice')}
        </Typography>
      </Box>
    </Modal>
  );
};

export default WrongNetworkModal;
