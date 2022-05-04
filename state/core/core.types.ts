import { LoadingState } from '@/constants';

export interface CoreState {
  chainId: number | null;
  nativeBalance: string;
  loading: LoadingState;
  error: string;
  account: string;
}

export interface SetDataPayload {
  chainId: number | null;
  nativeBalance: string;
  account: string;
}

export interface ConnectWalletPayload {
  chainId: number;
  account: string;
}
