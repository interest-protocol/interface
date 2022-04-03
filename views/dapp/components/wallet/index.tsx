import { ProviderRpcError } from '@web3-react/types';
import { FC, useCallback, useEffect, useState } from 'react';

import hooks from '@/connectors';
import { CHAIN_ID, getChainId } from '@/constants/chains';
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
  const [targetChainId, setTargetChainId] = useState(0);
  const [isSwitchingNetworks, setIsSwitchingNetworks] = useState(false);
  const [failedSwitchingNetwork, setFailedSwitchingNetwork] = useState(false);

  const error = usePriorityError();
  const chainId = usePriorityChainId();
  const isActive = usePriorityIsActive();
  const connector = usePriorityConnector();
  const isActivating = usePriorityIsActivating();

  const switchNetwork = useCallback(
    async (x: CHAIN_ID): Promise<void> => {
      setTargetChainId(x);
      try {
        if (!connector) return;
        setIsSwitchingNetworks(true);
        await switchToNetwork(connector, x);
      } catch {
        setFailedSwitchingNetwork(true);
      } finally {
        setIsSwitchingNetworks(false);
      }
    },
    [connector]
  );

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    if (!isSwitchingNetworks && !failedSwitchingNetwork)
      (async () => {
        try {
          setIsSwitchingNetworks(true);
          if ((error as ProviderRpcError)?.code === 1013)
            await connector.activate(targetChainId);
        } catch {
          setFailedSwitchingNetwork(true);
        } finally {
          setIsSwitchingNetworks(false);
        }
      })();
    return () => {
      isMounted = false;
    };
  }, [error]);

  if (!isActive && !isActivating) return <ConnectWallet />;

  if (isSwitchingNetworks) return <SwitchingNetwork />;

  if (failedSwitchingNetwork)
    return (
      <Button variant="primary" bg="error">
        Switch Network Manually
      </Button>
    );

  if (!!chainId && getChainId(chainId ?? 0) === CHAIN_ID.UNSUPPORTED)
    return <WrongNetwork />;

  return (
    <>
      <SelectNetwork switchNetwork={switchNetwork} />
      <ConnectedWallet />
    </>
  );
};

export default Wallet;
