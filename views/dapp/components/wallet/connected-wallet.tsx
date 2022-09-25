import { not } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { LoadingState } from '@/constants';
import {
  getNativeCurrencySymbol,
  isChainIdSupported,
} from '@/constants/chains';
import { Box, Button, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { getCoreData } from '@/state/core/core.selectors';
import { CoreState } from '@/state/core/core.types';
import { LoadingSVG, MetaMaskSVG } from '@/svg';
import { isValidAccount, shortAccount } from '@/utils';

import ConnectWallet from './connect-wallet';
import AccountModal from './wallet-modal/account-modal';

const {
  usePriorityConnector,
  useSelectedAccount,
  useSelectedProvider,
  usePriorityChainId,
} = priorityHooks;

const ConnectedWallet: FC = () => {
  const connector = usePriorityConnector();
  const provider = useSelectedProvider(connector);
  const account = useSelectedAccount(connector);
  const chainId = usePriorityChainId();
  const dispatch = useDispatch();
  const coreData = useSelector(getCoreData) as CoreState;

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (
      chainId &&
      isChainIdSupported(chainId) &&
      account &&
      isValidAccount(account) &&
      chainId !== coreData.chainId
    ) {
      dispatch(coreActions.connectWallet({ chainId, account }));
    }
  }, [chainId, account]);

  const toggleModal = () => {
    setShowModal(not);
  };

  return coreData.account ? (
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
        {coreData.loading !== LoadingState.Fetching ? (
          `${FixedPointMath.from(
            coreData.nativeBalance
          ).toNumber()} ${getNativeCurrencySymbol(chainId || 0)}`
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
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
        >
          <MetaMaskSVG height="100%" width="100%" />
        </Box>
        <Typography variant="normal" color="text" display={['none', 'block']}>
          {shortAccount(coreData.account)}
        </Typography>
        <Typography variant="normal" color="text" display={['block', 'none']}>
          {shortAccount(coreData.account, true)}
        </Typography>
      </Button>
      <AccountModal
        url={provider?.connection.url || ''}
        account={coreData.account}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  ) : (
    <ConnectWallet />
  );
};

export default ConnectedWallet;
