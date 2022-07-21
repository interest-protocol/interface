import { ThemeProvider } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import priorityHooks from '@/connectors';
import { Routes, SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { DAppTheme, LandingPageTheme } from '@/design-system';
import { usePrevious } from '@/hooks';
import { coreActions } from '@/state/core/core.actions';
import { getAccount, getChainId } from '@/state/core/core.selectors';
import { TimesSVG } from '@/svg';
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
  usePriorityAccount,
} = priorityHooks;

const Content: FC<ContentProps> = ({
  error,
  chainId,
  children,
  reduxChainId,
  triedEagerly,
  isActivating,
  supportedChains,
  handleSwitchToNetwork,
  triedSwitchToRightNetwork,
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
  const account = usePriorityAccount();
  const reduxAccount = useSelector(getAccount);

  const [triedSwitchToRightNetwork, setTriedSwitchToRightNetwork] =
    useState(false);
  const [triedEagerly, setTriedEagerly] = useState(false);
  const [isSwitching, setSwitching] = useState(false);

  const handleSwitchToNetwork = (targetChainId: number) => async () => {
    try {
      if (isSwitching) return;
      setSwitching(true);
      await switchToNetwork(connector, targetChainId);
    } finally {
      setSwitching(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (triedEagerly) return;
    (async () => {
      try {
        if (connector.connectEagerly) await connector?.connectEagerly();
        setTriedEagerly(true);
        // eslint-disable-next-line no-empty
      } catch {}
    })();
  }, [connector]);

  useEffect(() => {
    if (!triedEagerly) return;

    if (prevPathName === pathname) return;

    if (!!chainId && !supportedChains.includes(chainId))
      (async () => {
        try {
          await handleSwitchToNetwork(supportedChains[0])();
          setTriedSwitchToRightNetwork(true);
          // eslint-disable-next-line no-empty
        } catch {}
      })();
  }, [supportedChains, chainId, triedEagerly, pathname, prevPathName]);

  useEffect(() => {
    if (!triedEagerly) return;

    if (!triedSwitchToRightNetwork) return;

    if (!chainId) dispatch(coreActions.setDefaultData());
  }, [triedEagerly, triedSwitchToRightNetwork, chainId, reduxChainId]);

  useEffect(() => {
    if (account !== reduxAccount)
      dispatch(coreActions.setAccount(account || ''));
  }, [account]);

  return (
    <Layout>
      <Content
        error={error}
        chainId={chainId}
        isActivating={isActivating}
        triedEagerly={triedEagerly}
        reduxChainId={reduxChainId}
        supportedChains={supportedChains}
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
        supportedChains={SUPPORTED_CHAINS_RECORD[pathname]}
      >
        {children}
      </Web3Manager>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={LandingPageTheme}>{children}</ThemeProvider>
  );
};

export default Web3ManagerWrapper;
