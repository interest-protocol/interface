import { createSlice } from '@reduxjs/toolkit';

import { LoadingState, NO_STATE_ERROR } from '@/constants';

import { userBalancesAdapter } from './user-balances.adapter';
import * as reducerHelpers from './user-balances.reducer-helpers';

export const USER_BALANCES = 'userBalances';

export const userBalancesSlice = createSlice({
  name: USER_BALANCES,
  initialState: userBalancesAdapter.getInitialState({
    loading: LoadingState.Idle,
    error: NO_STATE_ERROR,
  }),
  reducers: {
    fetchingUserBalances: reducerHelpers.fetching,
    setAllUserBalances: reducerHelpers.setAllUserBalance,
    setError: reducerHelpers.setError,
    addUserBalance: reducerHelpers.addUserBalance,
  },
});

export const userBalanceEntityActions = userBalancesSlice.actions;
