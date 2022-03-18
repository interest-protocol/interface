import { useEffect, useState } from 'react';

import priorityHooks from '../../connectors';

const {
  usePriorityIsActive,
  usePriorityError,
  usePriorityConnector,
  usePriorityIsActivating,
} = priorityHooks;

const Web3Manager = (props: { children: JSX.Element }) => {
  const connector = usePriorityConnector();
  const error = usePriorityError();
  const isActive = usePriorityIsActive();
  const isActivating = usePriorityIsActivating();

  const [triedEagerly, setTriedEagerly] = useState(false);

  useEffect(() => {
    if (triedEagerly) return;
    (async () => {
      if (connector.connectEagerly) await connector?.connectEagerly();
      setTriedEagerly(true);
    })();
  }, [connector]);

  if (triedEagerly && !isActive && error)
    return <div>Ooops something is wrong</div>;

  // Make button load not the whole page
  if (!error && !triedEagerly && isActivating) return <div>loading</div>;

  return props.children;
};

export default Web3Manager;
