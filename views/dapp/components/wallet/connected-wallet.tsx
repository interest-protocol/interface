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
import { IntMath, ZERO_ADDRESS } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { getCoreData } from '@/state/core/core.selectors';
import { CoreState } from '@/state/core/core.types';
import { LoadingSVG, MetaMaskSVG } from '@/svg';
import { shortAccount } from '@/utils';

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
    if (chainId && isChainIdSupported(chainId) && account)
      dispatch(coreActions.connectWallet({ chainId, account }));
  }, [chainId, account]);

  const toggleModal = () => {
    setShowModal(not);
  };

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
        {coreData.loading !== LoadingState.Fetching ? (
          `${IntMath.from(
            coreData.nativeBalance
          ).toNumber()} ${getNativeCurrencySymbol(chainId || 0)}`
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
          {shortAccount(coreData.account || ZERO_ADDRESS)}
        </Typography>
      </Button>
      <AccountModal
        url={provider?.connection.url || ''}
        account={coreData.account}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </Box>
  );
};

export default ConnectedWallet;
