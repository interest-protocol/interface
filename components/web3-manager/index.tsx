import { ThemeProvider } from '@emotion/react';
import { prop } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useConnect } from 'wagmi';

import { Routes, SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { DAppTheme, LandingPageTheme } from '@/design-system';
import { usePrevious } from '@/hooks';
import { coreActions } from '@/state/core/core.actions';
import { TimesSVG } from '@/svg';
import { Layout, Loading } from '@/views/dapp/components';

import Advice from './advice';
import {
  ContentProps,
  Web3ManagerProps,
  Web3ManagerWrapperProps,
} from './web3-manager.type';

const Content: FC = ({ children }) => {
  const { error, isLoading, connectors, pendingConnector, connect } =
    useConnect();

  const isConnecting =
    connectors.filter(({ id }) => id === pendingConnector?.id)[0] || false;

  const noSupport = connectors.some(({ ready }) => !ready);

  if (!error && (isLoading || isConnecting)) return <Loading />;

  if (noSupport)
    return (
      <Advice
        Icon={TimesSVG}
        title="Not supported"
        lines={[
          'This chain is not supported',
          'Please, switch to a supported chain',
        ]}
        buttons={connectors.filter(prop('ready')).map((connector) => ({
          text: `Switch to`,
          action: () => connect({ connector }),
        }))}
      />
    );

  return <>{children}</>;
};

const Web3Manager: FC<Web3ManagerProps> = ({ children }) => {
  return (
    <Layout>
      <Content>{children}</Content>
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
