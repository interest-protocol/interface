import { PayloadAction } from '@reduxjs/toolkit';
import {
  all,
  AllEffect,
  call,
  CallEffect,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { userBalanceActions } from '@/state/user-balances/user-balances.actions';
import { userBalanceEntitySelectors } from '@/state/user-balances/user-balances.selectors';

import { swapActions, SwapActionTypes } from './swap.actions';
import { SetInitialData } from './swap.types';

function* setInitialDataSaga({
  payload,
}: PayloadAction<SetInitialData>): unknown {
  try {
    const { tokenOut, tokenIn, chainId, account } = payload;

    const tokenBalancesIds: Array<string> = yield select(
      userBalanceEntitySelectors.selectIds
    );

    // We do not need to fetch the balances if they have been fetched already
    if (
      !tokenBalancesIds.includes(tokenIn) ||
      !tokenBalancesIds.includes(tokenOut)
    ) {
      yield put(
        userBalanceActions.getUserBalancesStart({
          chainId,
          user: account,
          tokens: [],
        })
      );
    }

    yield put(swapActions.setTokenIn(tokenIn));
    yield put(swapActions.setTokenOut(tokenOut));
  } catch (error) {
    console.log(error);
  }
}

function* watchSetInitialData() {
  yield takeLatest(SwapActionTypes.setInitialData, setInitialDataSaga);
}

export function* swapSagas(): Generator<
  AllEffect<CallEffect<void>>,
  void,
  unknown
> {
  yield all([call(watchSetInitialData)]);
}
