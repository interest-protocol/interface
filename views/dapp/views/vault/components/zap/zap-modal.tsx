import { FC } from 'react';

import Box from '@/elements/box';
import Modal from '@/elements/modal';

import { ZapModalProps } from './zap.types';

const ZapModal: FC<ZapModalProps> = ({ isOpen, handleClose }) => {
  return (
    <Modal
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        onRequestClose: handleClose,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
      <Box
        py="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="22rem"
        maxWidth="26rem"
        borderRadius="M"
        px={['L', 'XL']}
      ></Box>
    </Modal>
  );
};

export default ZapModal;
