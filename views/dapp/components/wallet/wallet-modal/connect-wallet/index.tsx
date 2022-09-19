import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { v4 } from 'uuid';
import { useConnect } from 'wagmi';

import { metaMask } from '@/connectors/meta-mask';
import { Wallets } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { BackSVG, LoadingSVG, MetaMaskSVG, TimesSVG } from '@/svg';
import { capitalize } from '@/utils';

import { ConnectWalletProps, WalletButtonProps } from '../../wallet.types';

const WalletButton: FC<WalletButtonProps> = ({ onClick, name, Icon }) => (
  <Box
    p="L"
    mb="M"
    color="text"
    display="flex"
    cursor="pointer"
    borderRadius="M"
    onClick={onClick}
    alignItems="center"
    bg="bottomBackground"
    justifyContent="space-between"
    hover={{
      bg: 'accent',
    }}
    active={{
      bg: 'accentActive',
    }}
  >
    {name}
    <Box width="2rem" height="2rem" display="flex" alignItems="center">
      <Icon width="2rem" height="2rem" />
    </Box>
  </Box>
);

const ConnectWalletModal: FC<ConnectWalletProps> = ({
  showModal,
  toggleModal,
}) => {
  const t = useTranslations();
  const { connect, connectors, error } = useConnect();
  const [modalState, setModalState] = useState({
    chooser: true,
    [Wallets.MetaMask]: false,
    [Wallets.WalletConnect]: false,
  });

  const swipeToWallet = (wallet?: Wallets) =>
    setModalState({
      chooser: false,
      [Wallets.MetaMask]: false,
      [Wallets.WalletConnect]: false,
      [wallet ?? 'chooser']: true,
    });

  return (
    <Modal
      background="#000A"
      modalProps={{
        isOpen: showModal,
        shouldCloseOnEsc: true,
        onRequestClose: toggleModal,
        shouldCloseOnOverlayClick: true,
      }}
    >
      {modalState.chooser && (
        <Box
          p="L"
          pb="NONE"
          width="20rem"
          border="none"
          display="flex"
          bg="foreground"
          borderRadius="L"
          maxHeight="80vh"
          minHeight="20rem"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              as="h3"
              color="text"
              variant="normal"
              fontWeight="normal"
            >
              {capitalize(t('common.connectYourWallet'))}
            </Typography>
            <Box
              cursor="pointer"
              color="textSecondary"
              onClick={toggleModal}
              hover={{ color: 'text' }}
            >
              <TimesSVG width="1.8rem" height="1.8rem" />
            </Box>
          </Box>
          {connectors.map((connector) => (
            <Box mt="L" key={v4()}>
              <WalletButton
                name="MetaMask"
                Icon={MetaMaskSVG}
                onClick={() => connect({ connector })}
              />
            </Box>
          ))}
        </Box>
      )}
      {modalState[Wallets.MetaMask] && (
        <Box
          p="L"
          pb="NONE"
          width="20rem"
          border="none"
          display="flex"
          bg="foreground"
          borderRadius="L"
          maxHeight="80vh"
          minHeight="20rem"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box color="text" cursor="pointer" onClick={() => swipeToWallet()}>
              <BackSVG width="1.4rem" height="1.4rem" />
            </Box>
            <Box
              cursor="pointer"
              color="textSecondary"
              onClick={toggleModal}
              hover={{ color: 'text' }}
            >
              <TimesSVG width="1.8rem" height="1.8rem" />
            </Box>
          </Box>
          <Box mt="L">
            <Box
              p="L"
              mb="M"
              color="text"
              display="flex"
              borderRadius="M"
              border="1px solid"
              alignItems="center"
              borderColor={error ? 'error' : 'textSecondary'}
            >
              {!error && (
                <>
                  <Box color="text">
                    <LoadingSVG width="1.4rem" height="1.4rem" />
                  </Box>
                  <Typography
                    variant="normal"
                    ml="L"
                    textTransform="capitalize"
                  >
                    {t('common.initialize', { isLoading: 1 })}
                  </Typography>
                </>
              )}
              {error && (
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="normal" color="error">
                      Error!
                    </Typography>
                    <Typography
                      as="span"
                      variant="normal"
                      fontSize="XS"
                      color="textSecondary"
                    >
                      {capitalize(t('common.unlockWalletDescription'))}
                    </Typography>
                  </Box>
                  <Button
                    ml="L"
                    type="button"
                    variant="secondary"
                    onClick={async (e) => {
                      e.stopPropagation();
                      metaMask.activate();
                    }}
                  >
                    {capitalize(t('common.tryAgain'))}
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              p="L"
              mb="M"
              color="text"
              display="flex"
              borderRadius="M"
              alignItems="center"
              bg="bottomBackground"
              justifyContent="space-between"
            >
              MetaMask
              <Box
                width="2rem"
                height="2rem"
                display="flex"
                alignItems="center"
              >
                <MetaMaskSVG width="2rem" height="2rem" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
