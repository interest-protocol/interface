import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { LoadingSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

import { ConnectWalletButtonProps } from './wallet.types';
import { ConnectWalletModal } from './wallet-modal';

const ConnectWallet: FC<ConnectWalletButtonProps> = ({ loading }) => {
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
        alignItems="center"
        display="inline-flex"
        bg="bottomBackground"
        onClick={() => {
          toggleModal();
          logGenericEvent('Modal_ConnectWallet');
        }}
        justifyContent="center"
        hover={{ bg: 'accent' }}
        active={{ bg: 'accentActive' }}
      >
        {loading ? (
          <>
            <Box as="span" display="inline-block" width="1rem" mr="M">
              <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
            <Typography
              as="span"
              fontSize="S"
              variant="normal"
              whiteSpace="nowrap"
            >
              {capitalize(t('common.load', { isLoading: 1 }))}
            </Typography>
          </>
        ) : (
          <Typography
            as="span"
            variant="normal"
            whiteSpace="nowrap"
            fontSize="S"
          >
            {capitalize(t('common.connectWallet'))}
          </Typography>
        )}
      </Button>
      <ConnectWalletModal showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default ConnectWallet;
