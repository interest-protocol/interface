import * as allChains from '@wagmi/core/chains';
import { useTranslations } from 'next-intl';
import { FC, useEffect } from 'react';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { WagmiConfig } from 'wagmi';

import { wagmiClient } from '@/connectors';
import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAINS } from '@/constants/chains';
import { TimesSVG } from '@/svg';
import { capitalize } from '@/utils';
import { Layout, Loading } from '@/views/dapp/components';

import Advice from './advice';
import { ContentProps, Web3ManagerProps } from './web3-manager.type';

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
            Object.values(allChains).find(({ id }) => id === chain?.id)?.name ||
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
  pathname,
  pageTitle,
}) => (
  <WagmiConfig client={wagmiClient}>
    <Layout pageTitle={pageTitle}>
      <Content supportedChains={SUPPORTED_CHAINS_RECORD[pathname]}>
        {children}
      </Content>
    </Layout>
  </WagmiConfig>
);

export default Web3Manager;
