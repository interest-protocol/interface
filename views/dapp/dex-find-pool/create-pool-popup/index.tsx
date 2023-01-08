import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import Modal from '@/elements/modal';
import Typography from '@/elements/typography';

import { CreatePoolPopupProps } from './create-pool-modal.types';

const CreatePoolPopup: FC<CreatePoolPopupProps> = ({
  isOpen,
  symbol0,
  symbol1,
  onCancel,
  onContinue,
}) => {
  const t = useTranslations();

  return (
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
          {t('dexPoolFind.createPoolPopup.title')}
        </Typography>
        <Typography variant="normal" py="XL">
          {t('dexPoolFind.createPoolPopup.description', {
            symbol0,
            symbol1,
            type: t(false ? 'common.stable' : 'common.volatile', {
              count: 1,
            }),
          })}
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr 1fr" columnGap="1rem">
          <Button
            variant="primary"
            onClick={onCancel}
            bg="bottomBackground"
            hover={{ bg: 'disabled' }}
          >
            <Typography
              as="span"
              fontSize="S"
              variant="normal"
              textTransform="capitalize"
            >
              {t('common.cancel')}
            </Typography>
          </Button>
          <Button
            variant="primary"
            onClick={onContinue}
            hover={{ bg: 'accentActive' }}
          >
            {t('dexPoolFind.createPoolPopup.submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePoolPopup;
