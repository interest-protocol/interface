import { FC } from 'react';
import toast from 'react-hot-toast';

import hooks from '@/connectors';
import { Box, Button, Modal, Typography } from '@/elements';
import { CopySVG, LinkSVG, TimesSVG, UserSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { AccountModalProps } from '../../wallet.types';

const { usePriorityConnector, usePriorityProvider } = hooks;

const AccountModal: FC<AccountModalProps> = ({
  account,
  showModal,
  toggleModal,
}) => {
  const provider = usePriorityProvider();
  const connector = usePriorityConnector();

  const disconnect = () => connector.deactivate();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(account || '');
    toast('Copied to clipboard');
  };

  return (
    <Modal modalProps={{ isOpen: showModal }} background="#0008">
      <Box p="L" width="100%" bg="foreground" maxWidth="23rem" borderRadius="L">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography as="h3" color="text" variant="normal" fontWeight="normal">
            Account
          </Typography>
          <Box
            color="textSecondary"
            cursor="pointer"
            onClick={toggleModal}
            hover={{ color: 'text' }}
          >
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
            <Button
              ml="L"
              variant="tertiary"
              onClick={disconnect}
              hover={{ color: 'text', bg: 'accent' }}
            >
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
              hover={{ color: 'text' }}
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
              <Box
                mx="M"
                fontSize="XS"
                display="flex"
                cursor="pointer"
                hover={{ color: 'text' }}
              >
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
  );
};
export default AccountModal;
