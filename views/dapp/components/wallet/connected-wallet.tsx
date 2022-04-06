import { FC, useState } from 'react';

import priorityHooks from '@/connectors';
import { Box, Button, Typography } from '@/elements';
import { useGetUserCurrency } from '@/hooks/use-get-user-currency';
import { LoadingSVG, MetaMaskSVG } from '@/svg';
import { shortAccount } from '@/utils';

import AccountModal from './wallet-modal/account-modal';

const { usePriorityConnector, useSelectedAccount, useSelectedProvider } =
  priorityHooks;

const ConnectedWallet: FC = () => {
  const connector = usePriorityConnector();
  const provider = useSelectedProvider(connector);
  const account = useSelectedAccount(connector);

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const { amount, symbol } = useGetUserCurrency();

  return (
    <Box
      bg="textSoft"
      display="flex"
      borderRadius="M"
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
        {symbol !== '???' ? (
          `${amount.toSignificant(4)} ${symbol}`
        ) : (
          <LoadingSVG width="1rem" height="1rem" />
        )}
      </Typography>
      <Button
        px="L"
        fontSize="M"
        border="none"
        borderRadius="M"
        variant="primary"
        maxHeight="2.8rem"
        display="inline-flex"
        bg="bottomBackground"
        onClick={toggleModal}
        hover={{
          bg: 'accent',
        }}
        active={{
          bg: 'accentActive',
        }}
      >
        <Box
          mr="L"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
        >
          <MetaMaskSVG height="100%" width="100%" />
        </Box>
        <Typography variant="normal" color="text">
          {shortAccount(account || '')}
        </Typography>
      </Button>
      <AccountModal
        url={provider?.connection.url || ''}
        account={account!}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  );
};

export default ConnectedWallet;
