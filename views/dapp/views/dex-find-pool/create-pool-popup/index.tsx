import { FC } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import Modal from '@/elements/modal';
import Typography from '@/elements/typography';

import { CreatePoolPopupProps } from './create-pool-modal.types';

const CreatePoolPopup: FC<CreatePoolPopupProps> = ({
  isOpen,
  isStable,
  symbol0,
  symbol1,
  onContinue,
  onCancel,
}) => (
  <Modal
    modalProps={{
      isOpen,
      shouldCloseOnEsc: true,
      onRequestClose: onCancel,
      shouldCloseOnOverlayClick: true,
    }}
    background="#0004"
  >
    <Box
      p="L"
      color="text"
      borderRadius="L"
      bg="foreground"
      minWidth="20rem"
      maxWidth="25rem"
    >
      <Typography
        variant="normal"
        textTransform="uppercase"
        color="textSecondary"
      >
        Create {isStable ? 'Stable' : 'Volatile'}
      </Typography>
      <Typography variant="normal" py="XL">
        {isStable ? (
          <>
            We recommend making a stable market for {symbol0} and {symbol1}.
          </>
        ) : (
          <>
            We recommend making a stable market for {symbol0} and {symbol1}.
          </>
        )}
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr" columnGap="1rem">
        <Button
          variant="primary"
          onClick={onCancel}
          bg="bottomBackground"
          hover={{ bg: 'disabled' }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onContinue}
          hover={{ bg: 'accentActive' }}
        >
          Create Anyway
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default CreatePoolPopup;
