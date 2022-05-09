import { LoadingState, NO_STATE_ERROR } from '@/constants';
import { addPositiveNumberStrings } from '@/utils';

import { userBalancesAdapter } from './user-balances.adapter';
import {
  IUserBalance,
  UserBalanceReducerHelper,
  UserBalanceReducerHelperWithAction,
} from './user-balances.types';

export const fetching: UserBalanceReducerHelper = (state) => {
  state.loading = LoadingState.Fetching;
  state.error = NO_STATE_ERROR;
};

export const addUserBalance: UserBalanceReducerHelperWithAction<IUserBalance> =
  (state, action) => {
    state.loading = LoadingState.Idle;
    state.error = NO_STATE_ERROR;
    const entity = state.entities[action.payload.id];
    userBalancesAdapter.setOne(state, {
      id: action.payload.id,
      balance: entity
        ? addPositiveNumberStrings(entity.balance, action.payload.balance)
        : action.payload.balance,
    });
  };

export const setAllUserBalance: UserBalanceReducerHelperWithAction<
  ReadonlyArray<IUserBalance>
> = (state, action) => {
  state.loading = LoadingState.Idle;
  state.error = NO_STATE_ERROR;
  userBalancesAdapter.setAll(state, action.payload);
};

export const setError: UserBalanceReducerHelperWithAction<string> = (
  state,
  action
) => {
  state.loading = LoadingState.Idle;
  state.error = action.payload;
};
