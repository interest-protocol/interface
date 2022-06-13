import { FC } from 'react';
import { useSelector } from 'react-redux';

import { CopyToClipboard } from '@/components';
import hooks from '@/connectors';
import { CHAINS } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import { getChainId } from '@/state/core/core.selectors';
import { LinkSVG, TimesSVG, UserSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { AccountModalProps } from '../../wallet.types';

const { usePriorityConnector } = hooks;

const AccountModal: FC<AccountModalProps> = ({
  url,
  account,
  showModal,
  toggleModal,
}) => {
  const connector = usePriorityConnector();
  const chainId = useSelector(getChainId) as number | null;

  const disconnect = () => connector.deactivate();

  return (
    <Modal
      modalProps={{
        isOpen: showModal,
        shouldCloseOnEsc: true,
        onRequestClose: toggleModal,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
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
            <TimesSVG width="1.8rem" height="1.8rem" />
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
              {url === 'metamask' ? 'MetaMask' : 'Wallet Connect'}
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
              <UserSVG height="100%" width="100%" />
            </Box>
            <Typography variant="normal" fontSize="L" color="text" ml="L">
              {shortAccount(account || '')}
            </Typography>
          </Box>
          <Box display="flex" color="textSecondary" mb="L" mt="XL">
            <CopyToClipboard
              display="flex"
              address={account}
              hover={{ color: 'text' }}
            >
              <Typography variant="normal" ml="M" fontSize="S">
                Copy Address
              </Typography>
            </CopyToClipboard>
            <a
              target="__blank"
              rel="noopener noreferrer"
              href={`${
                CHAINS[chainId || CHAIN_ID.UNSUPPORTED].blockExplorerUrls
              }/address/${account}`}
            >
              <Box
                mx="M"
                fontSize="XS"
                display="flex"
                cursor="pointer"
                hover={{ color: 'text' }}
              >
                <LinkSVG width="1rem" height="1rem" />
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
