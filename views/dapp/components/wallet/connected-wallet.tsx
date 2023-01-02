import { not } from 'ramda';
import { FC, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { shortAccount } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

import ConnectWallet from './connect-wallet';
import AccountModal from './wallet-modal/account-modal';

const NoWallet = () => <>?</>;

const ConnectedWallet: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const toggleModal = () => {
    setShowModal(not);
  };

  const WalletSVG = NoWallet;

  return isConnected ? (
    <Box
      bg="textSoft"
      display="flex"
      borderRadius="2rem"
      maxHeight="2.8rem"
      alignItems="center"
    >
      <Typography
        px="L"
        as="span"
        variant="normal"
        whiteSpace="nowrap"
        display={['none', 'inline-block']}
      >
        {!isLoading && !isError && data ? (
          `${data.formatted.slice(0, 6)} ${data.symbol}`
        ) : (
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
        )}
      </Typography>
      <Button
        px="L"
        fontSize="M"
        border="none"
        borderRadius="2rem"
        variant="primary"
        maxHeight="2.8rem"
        display="inline-flex"
        bg="bottomBackground"
        onClick={() => {
          toggleModal();
          logGenericEvent('Modal_AccountDetails');
        }}
        hover={{
          bg: 'accent',
        }}
        active={{
          bg: 'accentActive',
        }}
      >
        <Box
          mr="L"
          as="span"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
          display="inline-block"
        >
          <WalletSVG />
        </Box>
        <Typography variant="normal" color="text" display={['none', 'block']}>
          {shortAccount(address as string)}
        </Typography>
        <Typography variant="normal" color="text" display={['block', 'none']}>
          {shortAccount(address as string, true)}
        </Typography>
      </Button>
      <AccountModal
        account={address as string}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  ) : (
    <ConnectWallet />
  );
};

export default ConnectedWallet;
