import { chain, configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import { CHAINS, RPC_URL } from '@/constants';
import { CHAIN_ID } from '@/sdk';

const bnbTestNet = CHAINS[CHAIN_ID.BNB_TEST_NET];

const defaultChains = [chain.rinkeby, bnbTestNet];

const { provider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (_chain) => {
      if (_chain.id === bnbTestNet.id)
        return { http: RPC_URL[CHAIN_ID.BNB_TEST_NET] };

      if (_chain.id === chain.rinkeby.id)
        return { http: RPC_URL[CHAIN_ID.RINKEBY] };
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
  ],
});
