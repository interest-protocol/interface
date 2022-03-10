import { FC } from 'react';

import { Box } from '../../elements';
import { TimesSVG } from '../svg';
import { ModalCardProps } from './modal-card.types';

const ModalCard: FC<ModalCardProps> = ({ children, onClose }) => (
  <Box
    p="XL"
    width="20rem"
    display="flex"
    color="accent"
    bg="foreground"
    minHeight="20rem"
    position="relative"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    borderBottom="0.625rem solid"
    borderColor="accent"
  >
    <Box
      top="1rem"
      left="1rem"
      width="2rem"
      height="2rem"
      display="flex"
      cursor="pointer"
      borderRadius="S"
      position="absolute"
      alignItems="center"
      bg="bottomBackground"
      justifyContent="center"
      onClick={onClose}
    >
      <TimesSVG width="1rem" />
    </Box>
    {children}
  </Box>
);

export default ModalCard;
