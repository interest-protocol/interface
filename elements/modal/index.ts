import styled from '@emotion/styled';
import ReactModal from 'react-modal';
import {
  background,
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  shadow,
  space,
  system,
  typography,
} from 'styled-system';

import { ModalProps } from './modal.types';

ReactModal.setAppElement('#__next');

const Modal = styled(ReactModal)<ModalProps>(
  {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compose(
    color,
    position,
    space,
    border,
    shadow,
    flexbox,
    layout,
    typography,
    background,
    system({
      cursor: true,
    })
  )
);

export default Modal;
