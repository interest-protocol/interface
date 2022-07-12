import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { coreSagas } from './core/core.sagas';
import { userBalancesSagas } from './user-balances/user-balances.sagas';

export function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(userBalancesSagas), fork(coreSagas)]);
}
