import priorityHooks from '@connectors';
import { FC, useEffect, useState } from 'react';

const { usePriorityError, usePriorityConnector, usePriorityIsActivating } =
  priorityHooks;

const Web3Manager: FC = ({ children }) => {
  const error = usePriorityError();
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

  // Make button load not the whole page
  if (!error && !triedEagerly && isActivating) return <div>loading</div>;

  return <>{children}</>;
};

export default Web3Manager;
