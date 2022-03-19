import { useEffect, useState } from 'react';

import priorityHooks from '../../connectors';

const { usePriorityError, usePriorityConnector, usePriorityIsActivating } =
  priorityHooks;

const Web3Manager = (props: { children: JSX.Element }): JSX.Element => {
  const connector = usePriorityConnector();
  const error = usePriorityError();
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

  return props.children;
};

export default Web3Manager;
