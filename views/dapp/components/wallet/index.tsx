import { ProviderRpcError } from '@web3-react/types';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

import hooks from '@/connectors';
import { isChainIdSupported } from '@/constants/chains';
import { Button } from '@/elements';
import { switchToNetwork } from '@/utils/web3-provider';

import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import SelectNetwork from './select-network';
import SwitchingNetwork from './switching-network';
import WrongNetwork from './wrong-network';

const {
  usePriorityIsActive,
  usePriorityChainId,
  usePriorityIsActivating,
  usePriorityConnector,
  usePriorityError,
} = hooks;

const Wallet: FC = () => {
  const { isLoading, error } = useConnect();
  const { isConnecting, isReconnecting, isDisconnected } = useAccount();

  if (isLoading || isReconnecting || isConnecting) return <div> loading</div>;

  if (isDisconnected) return <ConnectWallet />;

  if (error) return <div>error</div>;

  return (
    <>
      <SelectNetwork switchNetwork={async (x: number) => {}} />
      <ConnectedWallet />
    </>
  );
};

export default Wallet;
