import { createReducer } from '@reduxjs/toolkit';

import { LoadingState, NO_STATE_ERROR } from '@/constants';

import { coreActions } from './core.actions';
import { CoreState } from './core.types';

const initialState = {
  chainId: null,
  nativeBalance: '0',
  loading: LoadingState.Idle,
  error: NO_STATE_ERROR,
  account: '',
};

const {
  setChainId,
  setLoading,
  setNativeBalance,
  setError,
  setAccount,
  setData,
  connectWallet,
  setDefaultData,
} = coreActions;

export const coreReducer = createReducer<CoreState>(initialState, (builder) => {
  builder
    .addCase(setChainId, (state, action) => {
      state.chainId = action.payload;
      state.error = NO_STATE_ERROR;
      state.loading = LoadingState.Idle;
    })
    .addCase(setNativeBalance, (state, action) => {
      state.nativeBalance = action.payload;
      state.error = NO_STATE_ERROR;
      state.loading = LoadingState.Idle;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
      state.error = NO_STATE_ERROR;
    })
    .addCase(setError, (state, action) => {
      state.loading = LoadingState.Idle;
      state.error = action.payload;
    })
    .addCase(setAccount, (state, action) => {
      state.loading = LoadingState.Idle;
      state.error = NO_STATE_ERROR;
      state.account = action.payload;
    })
    .addCase(setData, (state, action) => {
      state.loading = LoadingState.Idle;
      state.error = NO_STATE_ERROR;
      state.account = action.payload.account;
      state.chainId = action.payload.chainId;
      state.nativeBalance = action.payload.nativeBalance;
    })
    .addCase(connectWallet, (state) => {
      state.loading = LoadingState.Fetching;
      state.error = NO_STATE_ERROR;
    })
    .addCase(setDefaultData, (state) => {
      state.loading = initialState.loading;
      state.account = initialState.account;
      state.chainId = initialState.chainId;
      state.nativeBalance = initialState.nativeBalance;
    });
});
