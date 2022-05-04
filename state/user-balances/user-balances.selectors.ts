import { EntityState } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { identity, pathOr, prop } from 'ramda';

import { LoadingState, NO_STATE_ERROR } from '@/constants';

import { USER_BALANCES } from './index';
import { userBalancesAdapter } from './user-balances.adapter';
import { IUserBalance } from './user-balances.types';

export const userBalanceEntitySelectors = userBalancesAdapter.getSelectors(
  prop<string, EntityState<IUserBalance>>(USER_BALANCES)
);

export const getUserBalanceLoading = createSelector(
  pathOr(LoadingState.Idle, [USER_BALANCES, 'loading']),
  identity
);

export const getUserBalanceError = createSelector(
  pathOr(NO_STATE_ERROR, [USER_BALANCES, 'error']),
  identity
);

export const userBalanceSelectById =
  (id: string) => (entity: Record<string, EntityState<IUserBalance>>) =>
    userBalanceEntitySelectors.selectById(entity, id);
