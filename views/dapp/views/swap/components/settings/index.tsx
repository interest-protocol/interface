import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Button, Modal, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import Field from './field';
import { SwapModalProps } from './settings.types';

const SettingsModal: FC<SwapModalProps> = ({ isOpen, handleClose }) => {
  const { register } = useForm();

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
      <Container dapp my="auto">
        <Box
          color="text"
          width="100%"
          bg="foreground"
          minWidth="22rem"
          borderRadius="M"
          px={['L', 'L']}
        >
          <Box display="flex">
            <Button
              my="auto"
              width="3rem"
              height="3rem"
              p="S"
              bg="transparent"
              onClick={handleClose}
              hover={{
                bg: 'background',
              }}
              variant="secondary"
            >
              <TimesSVG width="100%" height="100%" />
            </Button>
          </Box>
          <Box pb="L">
            <Field
              label="Tolerância de Deslizamento ?"
              step="0.01"
              name="percentual"
              placeholder="25.00"
              register={register}
              prefix={
                <Button
                  px="M"
                  fontSize="S"
                  height="100%"
                  variant="secondary"
                  bg="accent"
                  hover={{ bg: 'accent' }}
                  active={{ bg: 'accentActive' }}
                >
                  Automático
                </Button>
              }
              suffix={<Typography variant="normal">%</Typography>}
            />
            <Field
              label="Prazo de transação ?"
              step="1"
              name="minutes"
              placeholder="30"
              register={register}
              suffix={<Typography variant="normal">minutos</Typography>}
            />
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default SettingsModal;
