import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Button, Typography } from '@/elements';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { capitalize } from '@/utils';

import { ConnectWalletModal } from './wallet-modal';

const ConnectWallet: FC = () => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState<boolean>(false);

  const isMounted = useIsMounted();

  const toggleModal = () => {
    if (!isMounted.current) return;
    setShowModal((state) => !state);
  };

  return (
    <>
      <Button
        variant="primary"
        bg="bottomBackground"
        onClick={toggleModal}
        hover={{ bg: 'accent' }}
        active={{ bg: 'accentActive' }}
      >
        <Typography as="span" variant="normal" whiteSpace="nowrap" fontSize="S">
          {capitalize(t('common.connectWallet'))}
        </Typography>
      </Button>
      <ConnectWalletModal showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default ConnectWallet;
