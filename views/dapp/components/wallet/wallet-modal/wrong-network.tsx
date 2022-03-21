import { FC } from 'react';

import { Box, Modal, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import { WrongNetworkModalProps } from '../wallet.types';

const WrongNetworkModal: FC<WrongNetworkModalProps> = ({
  isOpen,
  handleClose,
}) => (
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
          Wrong Network
        </Typography>
        <Box onClick={handleClose} cursor="pointer">
          <TimesSVG width="1.8rem" />
        </Box>
      </Box>
      <Typography my="M" fontSize="S" variant="normal" color="textSecondary">
        Please connect to a supported network in the dropdown menu or in your
        wallet.
      </Typography>
    </Box>
  </Modal>
);

export default WrongNetworkModal;