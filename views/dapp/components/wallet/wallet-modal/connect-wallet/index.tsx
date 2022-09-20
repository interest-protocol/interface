import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';
import { useConnect } from 'wagmi';

import { Box, Modal, Typography } from '@/elements';
import { MetaMaskSVG, TimesSVG } from '@/svg';
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
  const { connect, connectors } = useConnect();

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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography as="h3" color="text" variant="normal" fontWeight="normal">
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
              name={connector.name}
              Icon={MetaMaskSVG}
              onClick={() => connect({ connector })}
            />
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
