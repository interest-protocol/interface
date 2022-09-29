import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';
import { useConnect } from 'wagmi';

import { WALLET_SUPPORT_MAP, WALLET_SVG_MAP, Wallets } from '@/constants';
import { Box, Modal, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { TimesSVG } from '@/svg';
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
  const chainId = useChainId();
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
        <Box
          mb="L"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
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
        {connectors.map((connector) =>
          WALLET_SUPPORT_MAP[chainId].includes(connector.id as Wallets) ? (
            <Box mt="S" key={v4()}>
              <WalletButton
                name={connector.name}
                onClick={() => connect({ connector })}
                Icon={WALLET_SVG_MAP[connector.id as Wallets]}
              />
            </Box>
          ) : null
        )}
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
