import { CHAIN_ID } from '@/sdk';
import {
  BinanceWalletSVG,
  CoinBaseSVG,
  MathWalletSVG,
  MetaMaskSVG,
  OperaWalletSVG,
  TrustWalletSVG,
  WalletConnectSVG,
} from '@/svg';

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
  CoinbaseWallet: {
    SVG: CoinBaseSVG,
    id: Wallets.CoinbaseWallet,
    name: 'Coinbase Wallet',
  },
  BinanceWallet: {
    SVG: BinanceWalletSVG,
    id: Wallets.BinanceWallet,
    name: 'Binance Wallet',
  },
  TrustWallet: {
    SVG: TrustWalletSVG,
    id: Wallets.Injected,
    name: 'Trust Wallet',
  },
  WalletConnect: {
    SVG: WalletConnectSVG,
    id: Wallets.WalletConnect,
    name: 'Wallet Connect',
  },
  OperaWallet: {
    SVG: OperaWalletSVG,
    id: Wallets.Injected,
    name: 'Opera Wallet',
  },
  MathWallet: {
    SVG: MathWalletSVG,
    id: Wallets.Injected,
    name: 'Math Wallet',
  },
};

export const WALLETS_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [
    WALLET_RECORD.Metamask,
    WALLET_RECORD.CoinbaseWallet,
    WALLET_RECORD.BinanceWallet,
    WALLET_RECORD.WalletConnect,
    WALLET_RECORD.TrustWallet,
    WALLET_RECORD.MathWallet,
    WALLET_RECORD.OperaWallet,
  ],
  [CHAIN_ID.BNB_MAIN_NET]: [
    WALLET_RECORD.Metamask,
    WALLET_RECORD.CoinbaseWallet,
    WALLET_RECORD.BinanceWallet,
    WALLET_RECORD.WalletConnect,
    WALLET_RECORD.TrustWallet,
    WALLET_RECORD.MathWallet,
    WALLET_RECORD.OperaWallet,
  ],
  [CHAIN_ID.RINKEBY]: [
    WALLET_RECORD.Metamask,
    WALLET_RECORD.CoinbaseWallet,
    WALLET_RECORD.WalletConnect,
    WALLET_RECORD.TrustWallet,
    WALLET_RECORD.MathWallet,
    WALLET_RECORD.OperaWallet,
  ],
  [CHAIN_ID.UNSUPPORTED]: [],
};
