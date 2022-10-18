import { not } from 'ramda';
import { FC, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

import { WALLETS_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { ZERO_ADDRESS } from '@/sdk';
import { LoadingSVG } from '@/svg';
import { shortAccount } from '@/utils';

import ConnectWallet from './connect-wallet';
import AccountModal from './wallet-modal/account-modal';

const NoWallet = () => <>?</>;

const ConnectedWallet: FC = () => {
  const chainId = useChainId();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { address, isConnected, connector } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const toggleModal = () => {
    setShowModal(not);
  };

  const WalletSVG =
    WALLETS_MAP[chainId].find((wallet) => wallet.name === connector?.name)
      ?.SVG ?? NoWallet;

  return isConnected ? (
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
        {!isLoading && !isError && data ? (
          `${data.formatted.slice(0, 6)} ${data.symbol}`
        ) : (
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" />
          </Box>
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
          as="span"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
          display="inline-block"
        >
          <WalletSVG height="100%" width="100%" />
        </Box>
        <Typography variant="normal" color="text" display={['none', 'block']}>
          {shortAccount(address || ZERO_ADDRESS)}
        </Typography>
        <Typography variant="normal" color="text" display={['block', 'none']}>
          {shortAccount(address || ZERO_ADDRESS, true)}
        </Typography>
      </Button>
      <AccountModal
        account={address || ZERO_ADDRESS}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  ) : (
    <ConnectWallet />
  );
};

export default ConnectedWallet;
