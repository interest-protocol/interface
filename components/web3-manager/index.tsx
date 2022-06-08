import { ThemeProvider } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { Routes, SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { DAppTheme, LightTheme } from '@/design-system';
import { usePrevious } from '@/hooks';
import { coreActions } from '@/state/core/core.actions';
import { getChainId } from '@/state/core/core.selectors';
import { TimesSVG } from '@/svg';
import { switchToNetwork } from '@/utils';
import { Layout, Loading } from '@/views/dapp/components';

const GUARDED_ROUTES_ARRAY = [
  Routes.faucet,
  Routes.earn,
  Routes['mail-market-pool'],
  Routes['dinero-market'],
];

import Advice from './advice';
import {
  ContentProps,
  Web3ManagerProps,
  Web3ManagerWrapperProps,
} from './web3-manager.type';

const {
  usePriorityError,
  usePriorityConnector,
  usePriorityIsActivating,
  usePriorityChainId,
} = priorityHooks;

const Content: FC<ContentProps> = ({
  error,
  triedEagerly,
  isActivating,
  chainId,
  triedSwitchToRightNetwork,
  supportedChains,
  handleSwitchToNetwork,
  reduxChainId,
  children,
}) => {
  if (!error && !triedEagerly && isActivating) return <Loading />;

  if (
    !error &&
    chainId &&
    !triedSwitchToRightNetwork &&
    !supportedChains.includes(chainId)
  )
    return <Loading />;

  if (
    (!!chainId &&
      triedSwitchToRightNetwork &&
      !supportedChains.includes(chainId)) ||
    (!!reduxChainId &&
      triedSwitchToRightNetwork &&
      !supportedChains.includes(reduxChainId))
  )
    return (
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
    );

  return <>{children}</>;
};

const Web3Manager: FC<Web3ManagerProps> = ({
  pathname,
  supportedChains,
  prevPathName,
  children,
}) => {
  const error = usePriorityError();
  const chainId = usePriorityChainId();
  const connector = usePriorityConnector();
  const isActivating = usePriorityIsActivating();
  const reduxChainId = useSelector(getChainId) as null | number;

  const [triedSwitchToRightNetwork, setTriedSwitchToRightNetwork] =
    useState(false);
  const [triedEagerly, setTriedEagerly] = useState(false);

  const handleSwitchToNetwork = (targetChainId: number) => () =>
    switchToNetwork(connector, targetChainId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (triedEagerly) return;
    (async () => {
      if (connector.connectEagerly) await connector?.connectEagerly();
      setTriedEagerly(true);
    })();
  }, [connector]);

  useEffect(() => {
    if (!triedEagerly) return;

    if (prevPathName === pathname) return;

    if (!!chainId && !supportedChains.includes(chainId))
      (async () => {
        await handleSwitchToNetwork(supportedChains[0])();
        setTriedSwitchToRightNetwork(true);
      })();
  }, [supportedChains, chainId, triedEagerly, pathname, prevPathName]);

  useEffect(() => {
    if (!triedEagerly) return;

    if (!triedSwitchToRightNetwork) return;

    if (!reduxChainId) return;

    if (!chainId) dispatch(coreActions.setDefaultData());
  }, [triedEagerly, triedSwitchToRightNetwork, chainId, reduxChainId]);

  return (
    <Layout>
      <Content
        supportedChains={supportedChains}
        isActivating={isActivating}
        error={error}
        chainId={chainId}
        triedEagerly={triedEagerly}
        triedSwitchToRightNetwork={triedSwitchToRightNetwork}
        handleSwitchToNetwork={handleSwitchToNetwork}
        reduxChainId={reduxChainId}
      >
        {children}
      </Content>
    </Layout>
  );
};

const Web3ManagerWrapper: FC<Web3ManagerWrapperProps> = ({
  pathname,
  children,
}) => {
  const prevPathName = usePrevious(pathname);

  return pathname !== Routes.home ? (
    <ThemeProvider theme={DAppTheme}>
      <Web3Manager
        pathname={pathname}
        supportedChains={SUPPORTED_CHAINS_RECORD[pathname]}
        prevPathName={prevPathName}
      >
        {children}
      </Web3Manager>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
  );
};

export default Web3ManagerWrapper;
