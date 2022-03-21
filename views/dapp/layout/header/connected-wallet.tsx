import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import hooks from '@/connectors';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserCurrencyAmount } from '@/hooks/use-get-user-currency-amount';
import { getChainId } from '@/sdk/chains';
import { CopySVG, LinkSVG, NetworkSVG, TimesSVG, UserSVG } from '@/svg';
import { shortAccount } from '@/utils';

const {
  usePriorityConnector,
  usePriorityAccount,
  usePriorityChainId,
  usePriorityProvider,
} = hooks;

interface ConnectedWalletProps {
  isSwitchingNetworks: boolean;
  failedSwitchingNetwork: boolean;
}

const ConnectedWallet: FC<ConnectedWalletProps> = ({
  isSwitchingNetworks,
  failedSwitchingNetwork,
}) => {
  const chainId = usePriorityChainId();
  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const connector = usePriorityConnector();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);
  const toggleNetworkModal = () => setShowNetworkModal((state) => !state);

  const disconnect = () => connector.deactivate();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(account || '');
    toast('Copied to clipboard');
  };

  const currencyAmount = useGetUserCurrencyAmount();

  if (failedSwitchingNetwork)
    return (
      <Button variant="primary" bg="error" type="button">
        Error! Reload Page
      </Button>
    );

  if (isSwitchingNetworks)
    return (
      <Button type="button" variant="secondary">
        Switching Network
      </Button>
    );

  if (getChainId(chainId ?? 0) === 0)
    return (
      <>
        <Button
          bg="error"
          display="flex"
          variant="primary"
          borderRadius="L"
          alignItems="center"
          onClick={toggleNetworkModal}
        >
          <NetworkSVG width="1rem" />
          <Typography as="span" variant="normal" ml="M">
            Wrong Network
          </Typography>
        </Button>
        <Modal
          modalProps={{
            shouldCloseOnEsc: true,
            isOpen: showNetworkModal,
            shouldCloseOnOverlayClick: true,
            onRequestClose: toggleNetworkModal,
          }}
          background="#0008"
        >
          <Box
            p="L"
            width="100%"
            bg="foreground"
            maxWidth="23rem"
            borderRadius="L"
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
                Wrong Network
              </Typography>
              <Box onClick={toggleNetworkModal} cursor="pointer">
                <TimesSVG width="1.8rem" />
              </Box>
            </Box>
            <Typography
              my="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Please connect to a supported network in the dropdown menu or in
              your wallet.
            </Typography>
          </Box>
        </Modal>
      </>
    );

  return (
    <Box p="S" borderRadius="L" bg="bottomBackground">
      <Typography
        px="L"
        as="span"
        variant="normal"
        display={['none', 'inline-block']}
      >
        {currencyAmount.toSignificant(4)}
      </Typography>
      <Box
        py="M"
        px="L"
        as="button"
        fontSize="M"
        border="none"
        bg="textSoft"
        effect="hover"
        cursor="pointer"
        borderRadius="M"
        display="inline-flex"
        onClick={toggleModal}
      >
        <Typography variant="normal" color="text">
          {shortAccount(account || '')}
        </Typography>
        <Box
          ml="L"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
        >
          <UserSVG height="100%" />
        </Box>
      </Box>
      <Modal modalProps={{ isOpen: showModal }} background="#0008">
        <Box
          p="L"
          width="100%"
          bg="foreground"
          maxWidth="23rem"
          borderRadius="L"
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
              Account
            </Typography>
            <Box onClick={toggleModal} cursor="pointer">
              <TimesSVG width="1.8rem" />
            </Box>
          </Box>
          <Box
            p="L"
            mt="L"
            borderRadius="L"
            border="1px solid"
            borderColor="textSoft"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize="S" variant="normal" color="textSecondary">
                Connected with{' '}
                {provider?.connection.url === 'metamask'
                  ? 'MetaMask'
                  : 'Wallet Connect'}
              </Typography>
              <Button ml="L" variant="tertiary" onClick={disconnect}>
                Disconnect
              </Button>
            </Box>
            <Box display="flex" my="L">
              <Box
                width="1.5rem"
                height="1.5rem"
                overflow="hidden"
                borderRadius="50%"
              >
                <UserSVG height="100%" />
              </Box>
              <Typography variant="normal" fontSize="L" color="text" ml="L">
                {shortAccount(account || '')}
              </Typography>
            </Box>
            <Box display="flex" color="textSecondary" mb="L" mt="XL">
              <Box
                mx="M"
                fontSize="XS"
                display="flex"
                cursor="pointer"
                onClick={copyToClipboard}
              >
                <CopySVG width="1rem" />
                <Typography variant="normal" ml="M" fontSize="S">
                  Copy Address
                </Typography>
              </Box>
              <a
                target="__blank"
                rel="noopener noreferrer"
                href={`https://bscscan.io/address/${account}`}
              >
                <Box mx="M" fontSize="XS" display="flex" cursor="pointer">
                  <LinkSVG width="1rem" />
                  <Typography variant="normal" ml="M" fontSize="S">
                    View on Explorer
                  </Typography>
                </Box>
              </a>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConnectedWallet;
