import { FC } from 'react';
import ReactModal, { setAppElement } from 'react-modal';

import { ModalProps } from './modal.types';

setAppElement('#__next');

const Modal: FC<ModalProps> = ({ modalProps, children, background }) => (
  <ReactModal
    {...modalProps}
    style={{
      overlay: {
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(background && { background }),
      },
      content: {
        padding: 0,
        border: 'none',
        maxWidth: '95vw',
        maxHeight: '95vh',
        borderRadius: '0',
        position: 'static',
        background: 'transparent',
      },
    }}
  >
    {children}
  </ReactModal>
);

export default Modal;
