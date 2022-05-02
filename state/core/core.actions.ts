import { createAction } from '@reduxjs/toolkit';

import { LoadingState } from '@/constants/index';

import { ConnectWalletPayload, SetDataPayload } from './core.types';

export const CoreActionTypes = {
  setChainId: 'core/setChainId',
  setNativeBalance: 'core/setNativeBalance',
  setLoading: 'core/setLoading',
  setError: 'core/setError',
  setAccount: 'core/account',
  setData: 'core/setData',
  connectWallet: 'core/connectWallet',
};

const setChainId = createAction<number | null>(CoreActionTypes.setChainId);

const setNativeBalance = createAction<string>(CoreActionTypes.setChainId);

const setLoading = createAction<LoadingState>(CoreActionTypes.setLoading);

const setError = createAction<string>(CoreActionTypes.setError);

const setAccount = createAction<string>(CoreActionTypes.setAccount);

const setData = createAction<SetDataPayload>(CoreActionTypes.setData);

const connectWallet = createAction<ConnectWalletPayload>(
  CoreActionTypes.connectWallet
);

export const coreActions = {
  setLoading,
  setChainId,
  setNativeBalance,
  setError,
  setAccount,
  setData,
  connectWallet,
};
