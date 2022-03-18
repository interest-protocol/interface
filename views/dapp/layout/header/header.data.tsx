import {
  BinanceSVG,
  EthereumSVG,
  MetaMaskSVG,
  PolygonSVG,
  WalletSVG,
} from '../../../../components/svg';
import { INetworkOption, IWalletOption } from './header.types';

export const walletOptions: ReadonlyArray<IWalletOption> = [
  {
    key: 'meta-mask',
    Icon: MetaMaskSVG,
    name: 'MetaMask',
  },
  {
    key: 'trust-wallet',
    Icon: WalletSVG,
    name: 'TrustWallet',
  },
  {
    key: 'ledger',
    Icon: WalletSVG,
    name: 'Ledger',
  },
  {
    key: 'binance-wallet',
    Icon: WalletSVG,
    name: 'BinanceWallet',
  },
  {
    key: 'wallet-connect',
    Icon: WalletSVG,
    name: 'WalletConnect',
  },
];

export const networkOptions: ReadonlyArray<INetworkOption> = [
  {
    key: 'binance',
    Icon: BinanceSVG,
    name: 'Binance Smart Chain',
  },
  {
    key: 'ethereum',
    Icon: EthereumSVG,
    name: 'Ethereum',
  },
  {
    key: 'polygon',
    Icon: PolygonSVG,
    name: 'Polygon',
  },
];
