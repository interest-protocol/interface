import { CHAIN_ID } from '@/sdk';
import {
  BinanceWalletSVG,
  CoinBaseSVG,
  MetaMaskSVG,
  WalletConnectSVG,
} from '@/svg';

export enum Wallets {
  MetaMask = 'metaMask',
  WalletConnect = 'walletConnect',
  CoinbaseWallet = 'coinbaseWallet',
  BinanceWallet = 'binanceWallet',
}

export const WALLET_SVG_MAP = {
  [Wallets.MetaMask]: MetaMaskSVG,
  [Wallets.WalletConnect]: WalletConnectSVG,
  [Wallets.CoinbaseWallet]: CoinBaseSVG,
  [Wallets.BinanceWallet]: BinanceWalletSVG,
};

export const WALLET_SUPPORT_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [
    Wallets.MetaMask,
    Wallets.WalletConnect,
    Wallets.CoinbaseWallet,
    Wallets.BinanceWallet,
  ],
  [CHAIN_ID.BNB_MAIN_MET]: [
    Wallets.MetaMask,
    Wallets.WalletConnect,
    Wallets.CoinbaseWallet,
    Wallets.BinanceWallet,
  ],
  [CHAIN_ID.RINKEBY]: [
    Wallets.MetaMask,
    Wallets.WalletConnect,
    Wallets.CoinbaseWallet,
  ],
};
