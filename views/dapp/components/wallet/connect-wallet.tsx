import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { LoadingSVG } from '@/svg';
import { capitalize } from '@/utils';

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
        onClick={toggleModal}
        justifyContent="center"
        hover={{ bg: 'accent' }}
        active={{ bg: 'accentActive' }}
      >
        {loading ? (
          <>
            <Box as="span" display="inline-block" width="1rem" mr="M">
              <LoadingSVG width="100%" />
            </Box>
            <Typography
              as="span"
              fontSize="S"
              variant="normal"
              whiteSpace="nowrap"
            >
              {capitalize(t('common.loading'))}
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
