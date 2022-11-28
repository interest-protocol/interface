import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';
import { Connector, useConnect } from 'wagmi';

import { WALLETS_MAP } from '@/constants';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Modal, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { TimesSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logEvent } from '@/utils/analytics';

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
      <Icon width="2rem" height="2rem" maxHeight="2rem" maxWidth="2rem" />
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

  const CONNECTOR_MAP = connectors.reduce(
    (acc, connector) => ({ ...acc, [connector.id]: connector }),
    {} as Record<string, Connector>
  );
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
            <TimesSVG
              width="1.8rem"
              height="1.8rem"
              maxHeight="1.8rem"
              maxWidth="1.8rem"
            />
          </Box>
        </Box>
        <Box maxHeight="100%" overflow="auto">
          {WALLETS_MAP[chainId].map(({ SVG, id, name }) => {
            const connector = CONNECTOR_MAP[id];

            return connector ? (
              <Box mt="S" key={v4()}>
                <WalletButton
                  name={name}
                  onClick={() => {
                    logEvent(
                      GACategory.Wallet,
                      GAAction.Access,
                      'Wallet:' + name
                    );
                    connect({ connector });
                  }}
                  Icon={SVG}
                />
              </Box>
            ) : null;
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
