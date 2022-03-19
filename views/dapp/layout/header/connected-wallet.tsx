import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { CopySVG, TimesSVG } from '../../../../components/svg';
import hooks from '../../../../connectors';
import { Box, Button, Modal, Typography } from '../../../../elements';
import { shortAccount } from '../../../../utils/string';

const { useSelectedAccount, usePriorityConnector } = hooks;

const ConnectedWallet: FC = () => {
  const connector = usePriorityConnector();
  const selectedAccount = useSelectedAccount(connector);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal((state) => !state);

  const disconnect = () => connector.deactivate();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(selectedAccount || '');
    toast('Copied to clipboard');
  };

  return (
    <Box p="S" borderRadius="L" bg="bottomBackground">
      <Typography
        px="L"
        as="span"
        variant="normal"
        display={['none', 'inline-block']}
      >
        Balance
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
      >
        <Typography variant="normal" color="text">
          {shortAccount(selectedAccount || '')}
        </Typography>
        <Box
          ml="L"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
        >
          <img
            width="100%"
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
            alt="profile"
          />
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
                Connected with MetaMask
              </Typography>
              <Button variant="tertiary" onClick={disconnect}>
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
                <img
                  width="100%"
                  alt="profile"
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                />
              </Box>
              <Typography variant="normal" fontSize="L" color="text" ml="L">
                {shortAccount(selectedAccount || '')}
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
                href={`https://etherscan.io/address/${selectedAccount}`}
              >
                <Box mx="M" fontSize="XS" display="flex" cursor="pointer">
                  <CopySVG width="1rem" />
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
