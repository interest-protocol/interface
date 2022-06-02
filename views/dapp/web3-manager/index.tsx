import { inc } from 'ramda';
import { FC, useEffect, useState } from 'react';

import priorityHooks from '@/connectors';
import { CHAINS } from '@/constants/chains';
import { MetaMaskSVG, TimesSVG } from '@/svg';
import { switchToNetwork } from '@/utils';

import { Layout, Loading } from '../components';
import Advice from './advice';
import { Web3ManagerProps } from './web3-manager.type';

const {
  usePriorityError,
  usePriorityConnector,
  usePriorityIsActivating,
  usePriorityChainId,
} = priorityHooks;

const Web3Manager: FC<Web3ManagerProps> = ({ children, supportedChains }) => {
  const error = usePriorityError();
  const chainId = usePriorityChainId();
  const connector = usePriorityConnector();
  const isActivating = usePriorityIsActivating();

  const [triedSwitchToRightNetwork, setTriedSwitchToRightNetwork] = useState(0);
  const [triedEagerly, setTriedEagerly] = useState(false);

  const handleSwitchToNetwork = async (targetChainId: number) => () =>
    switchToNetwork(connector, targetChainId);

  useEffect(() => {
    if (triedEagerly) return;
    (async () => {
      if (connector.connectEagerly) await connector?.connectEagerly();
      setTriedEagerly(true);
    })();
  }, [connector]);

  useEffect(() => {
    if (triedSwitchToRightNetwork > 2) return;
    if (!!chainId && !supportedChains.includes(chainId)) {
      (async () => {
        await handleSwitchToNetwork(supportedChains[0]);
        setTriedSwitchToRightNetwork(inc);
      })();
    }
  }, [supportedChains, chainId, triedSwitchToRightNetwork]);

  if (!error && !triedEagerly && isActivating)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  if (
    !!chainId &&
    triedSwitchToRightNetwork > 2 &&
    !supportedChains.includes(chainId)
  )
    return (
      <Layout>
        <Advice
          Icon={TimesSVG}
          title="Not supported"
          lines={[
            'This chain is not supported',
            'Please, switch to a supported chain',
          ]}
          buttons={supportedChains.map((supportedChainId) => ({
            text: `Switch to ${CHAINS[supportedChainId].chainName}`,
            action: handleSwitchToNetwork(supportedChainId),
          }))}
        />
      </Layout>
    );

  if (!chainId)
    return (
      <Layout>
        <Advice
          Icon={MetaMaskSVG}
          title="Disconnected"
          lines={[<>Please, connect the wallet.</>]}
        />
      </Layout>
    );

  return <Layout>{children}</Layout>;
};

export default Web3Manager;
