import ReactModal, { setAppElement } from 'react-modal';

import { FCWithChildren } from '@/interface';

import { ModalProps } from './modal.types';

setAppElement('#__next');

const Modal: FCWithChildren<ModalProps> = ({
  modalProps,
  children,
  background,
}) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
