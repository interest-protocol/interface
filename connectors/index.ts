import {
  FallbackProvider,
  FallbackProviderConfig,
  JsonRpcProvider,
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { QueryClient } from '@tanstack/query-core';
import { bscTestnet } from '@wagmi/core/chains';
import { Chain, Client, configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import { RPC_URL } from '@/constants';
import { CHAIN_ID } from '@/sdk';

import { BinanceWalletConnector } from './binance-wallet-connector';

const defaultChains = [bscTestnet];

const { provider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (_chain) => {
      if (_chain.id === bscTestnet.id)
        return {
          http: RPC_URL[CHAIN_ID.BNB_TEST_NET],
          webSocket: process.env.NEXT_PUBLIC_BSC_TEST_NET_WEB_SOCKET,
        };
      return null;
    },
  }),
  publicProvider(),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector({ chains: defaultChains }),
    new CoinbaseWalletConnector({
      chains: defaultChains,
      options: {
        appName: 'interestprotocol.com',
        appLogoUrl: 'https://www.interestprotocol.com/logo.png',
      },
    }),
    new WalletConnectConnector({
      chains: defaultChains,
      options: {
        qrcode: true,
      },
    }),
    new BinanceWalletConnector({ chains: defaultChains }),
    new InjectedConnector({
      chains: defaultChains,
      options: { shimDisconnect: true },
    }),
  ],
}) as Client<
  | (JsonRpcProvider & FallbackProviderConfig & { chains: Chain[] })
  | (StaticJsonRpcProvider & FallbackProviderConfig & { chains: Chain[] })
  | (FallbackProvider & { chains: Chain[]; pollingInterval: number }),
  WebSocketProvider
> & { queryClient: QueryClient };
