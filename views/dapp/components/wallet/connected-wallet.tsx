import MetaMask from 'components/svg/meta-mask';
import { FC, useState } from 'react';

import hooks from '@/connectors';
import { Box, Button, Typography } from '@/elements';
import { useGetUserCurrency } from '@/hooks/use-get-user-currency';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { LoadingSVG } from '@/svg';
import { shortAccount } from '@/utils';

import AccountModal from './wallet-modal/account-modal';

const { usePriorityAccount, usePriorityProvider } = hooks;

const ConnectedWallet: FC = () => {
  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const [showModal, setShowModal] = useState<boolean>(false);

  const isMounted = useIsMounted();

  const toggleModal = () => {
    if (!isMounted.current) return;
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
          <LoadingSVG width="1rem" />
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
          <MetaMask height="100%" />
        </Box>
        <Typography variant="normal" color="text">
          {shortAccount(account || '')}
        </Typography>
      </Button>
      <AccountModal
        url={provider?.connection?.url || ''}
        account={account!}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  );
};

export default ConnectedWallet;
