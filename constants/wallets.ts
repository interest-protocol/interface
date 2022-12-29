import { CHAIN_ID } from '@/sdk';
import { MetaMaskSVG } from '@/svg';

export enum Wallets {
  MetaMask = 'metaMask',
  WalletConnect = 'walletConnect',
  CoinbaseWallet = 'coinbaseWallet',
  BinanceWallet = 'binanceWallet',
  Injected = 'injected',
}

const WALLET_RECORD = {
  Metamask: {
    SVG: MetaMaskSVG,
    id: Wallets.MetaMask,
    name: 'MetaMask',
  },
};

export const WALLETS_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [WALLET_RECORD.Metamask],
  [CHAIN_ID.BNB_MAIN_NET]: [WALLET_RECORD.Metamask],
  [CHAIN_ID.RINKEBY]: [WALLET_RECORD.Metamask],
  [CHAIN_ID.UNSUPPORTED]: [],
};
