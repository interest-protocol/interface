import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import hooks from '@/connectors';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserCurrencyAmount } from '@/hooks/use-get-user-currency-amount';
import { CopySVG, LinkSVG, TimesSVG, UserSVG } from '@/svg';
import { shortAccount } from '@/utils';

const { usePriorityConnector, usePriorityAccount, usePriorityProvider } = hooks;

const ConnectedWallet: FC = () => {
  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const connector = usePriorityConnector();
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);

  const disconnect = () => connector.deactivate();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(account || '');
    toast('Copied to clipboard');
  };

  const currencyAmount = useGetUserCurrencyAmount();

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
        cursor="pointer"
        borderRadius="M"
        display="inline-flex"
        onClick={toggleModal}
        hover={{
          bg: 'accent',
        }}
        active={{
          bg: 'accentActive',
        }}
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
    </Box>
  );
};

export default ConnectedWallet;
