import { ThemeProvider } from '@emotion/react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import {
  allChains,
  useAccount,
  useConnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

import { Routes, SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { LandingPageTheme } from '@/design-system';
import { DAppDarkTheme, DAppLightTheme } from '@/design-system/dapp-theme';
import { TimesSVG } from '@/svg';
import { capitalize } from '@/utils';
import { Layout, Loading } from '@/views/dapp/components';
import HomePageLayout from '@/views/home/layout';

import Advice from './advice';
import {
  ContentProps,
  Web3ManagerProps,
  Web3ManagerWrapperProps,
} from './web3-manager.type';

const Content: FC<ContentProps> = ({ supportedChains = [], children }) => {
  const { error, isLoading } = useConnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();
  const t = useTranslations();

  const isUnsupported = !supportedChains.includes(chain?.id || -1);

  useEffect(() => {
    if (isUnsupported) switchNetwork?.(supportedChains[0]);
  }, [chain, isUnsupported]);

  if (!error && isLoading) return <Loading />;

  if (isUnsupported && isConnected)
    return (
      <Advice
        Icon={TimesSVG}
        title={t('web3Manager.title', {
          chainName:
            allChains.find(({ id }) => id === chain?.id)?.name ||
            chain?.name ||
            capitalize(t('common.network', { count: 1 })),
        })}
        lines={[t('web3Manager.advice')]}
        buttons={supportedChains.map((id) => ({
          text: t('web3Manager.button', {
            chainName: CHAINS[id].name,
          }),
          action: () => switchNetwork?.(id),
        }))}
      />
    );

  return <>{children}</>;
};

const Web3Manager: FC<Web3ManagerProps> = ({
  children,
  supportedChains,
  pageTitle,
}) => (
  <Layout pageTitle={pageTitle}>
    <Content supportedChains={supportedChains}>{children}</Content>
  </Layout>
);

const Web3ManagerWrapper: FC<Web3ManagerWrapperProps> = ({
  pathname,
  pageTitle,
  children,
}) => {
  const [dark, setDark] = useState(false);

  return pathname !== Routes.home ? (
    <ThemeProvider
      theme={{ setDark, ...(dark ? DAppDarkTheme : DAppLightTheme) }}
    >
      <Web3Manager
        pageTitle={pageTitle}
        supportedChains={SUPPORTED_CHAINS_RECORD[pathname]}
      >
        {children}
      </Web3Manager>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={LandingPageTheme}>
      <HomePageLayout pageTitle={pageTitle}>{children}</HomePageLayout>
    </ThemeProvider>
  );
};

export default Web3ManagerWrapper;
