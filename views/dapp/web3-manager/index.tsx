import { FC, useEffect, useState } from 'react';

import priorityHooks from '@/connectors';
import { isChainIdSupported } from '@/constants/chains';
import { CHAIN_ID } from '@/sdk/constants';
import { MetaMaskSVG, TimesSVG } from '@/svg';

import { Layout, Loading } from '../components';
import Advertising from './advertising';

const {
  usePriorityError,
  usePriorityConnector,
  usePriorityIsActivating,
  usePriorityChainId,
} = priorityHooks;

const Web3Manager: FC = ({ children }) => {
  const error = usePriorityError();
  const chainId = usePriorityChainId();
  const connector = usePriorityConnector();
  const isActivating = usePriorityIsActivating();

  const [triedEagerly, setTriedEagerly] = useState(false);

  useEffect(() => {
    if (triedEagerly) return;
    (async () => {
      if (connector.connectEagerly) await connector?.connectEagerly();
      setTriedEagerly(true);
    })();
  }, [connector]);

  if (chainId === CHAIN_ID.BNB_MAIN_MET)
    return (
      <Layout>
        <Advertising
          title="Coming Soon"
          lines={[
            <>
              The <strong>BNB Main Net</strong> is under development.
            </>,
            <>
              Please, switch to <strong>BNB Test Net</strong>.
            </>,
          ]}
        />
      </Layout>
    );

  if (!error && !triedEagerly && isActivating)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  if (!!chainId && !isChainIdSupported(chainId))
    return (
      <Layout>
        <Advertising
          Icon={TimesSVG}
          title="Not supported"
          lines={[
            'This chain is not supported',
            'Please, switch to a supported chain',
          ]}
        />
      </Layout>
    );

  if (!chainId)
    return (
      <Layout>
        <Advertising
          Icon={MetaMaskSVG}
          title="Disconnected"
          lines={[<>Please, connect the wallet.</>]}
        />
      </Layout>
    );

  return <Layout>{children}</Layout>;
};

export default Web3Manager;
