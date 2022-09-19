import { Chain, chain, configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import { CHAINS, RPC_URL } from '@/constants';
import { CHAIN_ID } from '@/sdk';

const bnbTestNet = CHAINS[CHAIN_ID.BNB_TEST_NET];

const BSC_TEST_NET: Chain = {
  id: bnbTestNet.chainId,
  name: bnbTestNet.chainName,
  network: bnbTestNet.chainName.toLowerCase(),
  nativeCurrency: bnbTestNet.nativeCurrency,
  rpcUrls: {
    default: bnbTestNet.rpcUrls[0],
  },
  blockExplorers: {
    default: {
      name: 'BSCScan',
      url: bnbTestNet.blockExplorerUrls ? bnbTestNet.blockExplorerUrls[0] : '',
    },
  },
  testnet: true,
};

const defaultChains = [chain.rinkeby, BSC_TEST_NET];

const { provider } = configureChains(defaultChains, [
  publicProvider(),
  jsonRpcProvider({
    rpc: (_chain) => {
      if (_chain.id === BSC_TEST_NET.id)
        return { http: RPC_URL[CHAIN_ID.BNB_TEST_NET] };

      if (_chain.id === chain.rinkeby.id)
        return { http: RPC_URL[CHAIN_ID.RINKEBY] };
      return null;
    },
  }),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector({ chains: defaultChains }),
    new CoinbaseWalletConnector({
      chains: defaultChains,
      options: { appName: 'interestprotocol.com' },
    }),
    new WalletConnectConnector({
      chains: defaultChains,
      options: {
        qrcode: true,
      },
    }),
  ],
});
