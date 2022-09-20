import { CoinBaseSVG, MetaMaskSVG, WalletConnectSVG } from '@/svg';
export enum Wallets {
  MetaMask = 'metaMask',
  WalletConnect = 'walletConnect',
  CoinbaseWallet = 'coinbaseWallet',
}

export const WALLET_SVG_MAP = {
  [Wallets.MetaMask]: MetaMaskSVG,
  [Wallets.WalletConnect]: WalletConnectSVG,
  [Wallets.CoinbaseWallet]: CoinBaseSVG,
};
