import { ThemeProvider } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import priorityHooks from '@/connectors';
import { Routes, RoutesEnum } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { DAppTheme, LightTheme } from '@/design-system';
import { usePrevious } from '@/hooks';
import { CHAIN_ID } from '@/sdk';
import { MetaMaskSVG, TimesSVG } from '@/svg';
import { switchToNetwork } from '@/utils';
import { Layout, Loading } from '@/views/dapp/components';

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

const SUPPORTED_CHAINS = {
  [Routes[RoutesEnum.DApp]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.Earn]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.Faucet]]: [CHAIN_ID.RINKEBY],
  [Routes[RoutesEnum.DineroMarketRepay]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DineroMarket]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.MAILMarket]]: [CHAIN_ID.RINKEBY],
  [Routes[RoutesEnum.MAILMarketPool]]: [CHAIN_ID.RINKEBY],
  [Routes[RoutesEnum.Swap]]: [CHAIN_ID.RINKEBY],
};

const Content: FC<ContentProps> = ({
  error,
  triedEagerly,
  isActivating,
  chainId,
  triedSwitchToRightNetwork,
  supportedChains,
  handleSwitchToNetwork,
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
    !!chainId &&
    triedSwitchToRightNetwork &&
    !supportedChains.includes(chainId)
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

  if (!chainId)
    return (
      <Advice
        Icon={MetaMaskSVG}
        title="Disconnected"
        lines={[<>Please, connect the wallet.</>]}
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

  const [triedSwitchToRightNetwork, setTriedSwitchToRightNetwork] =
    useState(false);
  const [triedEagerly, setTriedEagerly] = useState(false);

  const handleSwitchToNetwork = (targetChainId: number) => () =>
    switchToNetwork(connector, targetChainId);

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
        prevPathName={prevPathName}
        supportedChains={SUPPORTED_CHAINS[pathname]}
      >
        {children}
      </Web3Manager>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
  );
};

export default Web3ManagerWrapper;
