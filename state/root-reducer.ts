import { coreReducer } from './core';
import { userBalancesSlice } from './user-balances';

export const rootReducer = {
  userBalances: userBalancesSlice.reducer,
  core: coreReducer,
};
