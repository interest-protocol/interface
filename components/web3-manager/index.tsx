import { FC, useEffect, useState } from 'react';

import priorityHooks from '@/connectors';
import { CHAIN_ID } from '@/sdk/chains';
import ComingSoonBSCMainNet from '@/views/dapp/views/coming-soon-bsc-main-net';
import Loading from '@/views/dapp/views/loading';

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

  if (chainId === CHAIN_ID.BSC_MAIN_MET) return <ComingSoonBSCMainNet />;

  if (!error && !triedEagerly && isActivating) return <Loading />;

  return <>{children}</>;
};

export default Web3Manager;
