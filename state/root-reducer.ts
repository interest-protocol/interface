import { coreReducer } from './core';
import { swapReducer } from './swap';
import { userBalancesSlice } from './user-balances';

export const rootReducer = {
  userBalances: userBalancesSlice.reducer,
  core: coreReducer,
  swap: swapReducer,
};
