import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { BugSVG } from '@/svg';
import { capitalize } from '@/utils';

import { WalletErrorModal } from './wallet-modal';

const WalletError: FC = () => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);

  return (
    <>
      <Button
        bg="error"
        display="flex"
        variant="primary"
        alignItems="center"
        onClick={toggleModal}
      >
        <Box as="span" display="inline-block" width="1rem">
          <BugSVG width="100%" />
        </Box>
        <Typography as="span" variant="normal" ml="M">
          {capitalize(t('common.loading'))}
        </Typography>
      </Button>
      <WalletErrorModal isOpen={showModal} handleClose={toggleModal} />
    </>
  );
};

export default WalletError;
