import { PayloadAction } from '@reduxjs/toolkit';
import { isNil } from 'ramda';
import {
  all,
  AllEffect,
  call,
  CallEffect,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { getUserBalances } from '@/api';
import { LoadingState } from '@/constants';
import { isChainIdSupported } from '@/constants/chains';

import { coreActions } from '../core/core.actions';
import { userBalancesSlice } from '.';
import { UserBalancesActionTypes } from './user-balances.actions';
import { GetUserBalancesStartPayload } from './user-balances.types';

function* getUserBalancesSaga({
  payload,
}: PayloadAction<GetUserBalancesStartPayload>): unknown {
  try {
    const { chainId, user, tokens } = payload;
    if (isNil(chainId) || !isChainIdSupported(chainId)) {
      yield put(userBalancesSlice.actions.setError('Unsupported chain Id'));
      yield put(coreActions.setError('Unsupported chain Id'));
    } else {
      yield put(userBalancesSlice.actions.fetchingUserBalances());
      yield put(coreActions.setLoading(LoadingState.Fetching));
      const [nativeBalances, tokenBalances] = yield call(
        getUserBalances,
        chainId,
        user,
        tokens,
        {}
      );

      yield put(coreActions.setNativeBalance(nativeBalances.toString()));
      yield put(
        userBalancesSlice.actions.setAllUserBalances(
          tokens.map((id, index) => ({
            balance: tokenBalances[index].toString(),
            id: id,
          }))
        )
      );
    }
  } catch {
    yield put(coreActions.setError('Failed to native balance'));
    yield put(userBalancesSlice.actions.setError('Failed to fetch balances'));
  }
}

function* watchGetUserBalancesStart() {
  yield takeLatest(
    UserBalancesActionTypes.getUserBalancesStart,
    getUserBalancesSaga
  );
}

export function* userBalancesSagas(): Generator<
  AllEffect<CallEffect<void>>,
  void,
  unknown
> {
  yield all([call(watchGetUserBalancesStart)]);
}
