import { ProviderRpcError } from '@web3-react/types';
import { FC, useCallback, useEffect, useState } from 'react';

import hooks from '@/connectors';
import { Button } from '@/elements';
import { CHAIN_ID, getChainId } from '@/sdk/chains';
import { switchToNetwork } from '@/utils/web3-provider';

import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import SelectNetwork from './select-network';
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
  }, [error]);

  if (isSwitchingNetworks)
    return (
      <Button type="button" variant="tertiary">
        Switching Network
      </Button>
    );

  if (failedSwitchingNetwork)
    return (
      <Button variant="primary" bg="error">
        Switch Network Manually
      </Button>
    );

  if (error)
    return (
      <Button variant="primary" bg="error">
        Something Wrong
      </Button>
    );

  if (!isActive && !isActivating) return <ConnectWallet />;

  if (getChainId(chainId ?? 0) === 0) return <WrongNetwork />;

  return (
    <>
      <SelectNetwork switchNetwork={switchNetwork} />
      <ConnectedWallet />
    </>
  );
};

export default Wallet;
