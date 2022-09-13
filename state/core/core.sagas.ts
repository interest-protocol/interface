import { PayloadAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { isNil } from 'ramda';
import {
  all,
  AllEffect,
  call,
  CallEffect,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { getAccountNativeBalance } from '@/api';
import { LoadingState } from '@/constants';
import { isChainIdSupported } from '@/constants/chains';
import { getAccount, getChainId } from '@/state/core/core.selectors';
import { ConnectWalletPayload } from '@/state/core/core.types';
import { userBalancesSlice } from '@/state/user-balances';
import { userBalanceActions } from '@/state/user-balances/user-balances.actions';
import { getBTCAddress, getDNRAddress, getIntAddress } from '@/utils/contracts';

import { coreActions, CoreActionTypes } from './core.actions';

function* updateNativeBalance() {
  const chainId: number | null = yield select(getChainId);
  const account: string = yield select(getAccount);
  try {
    if (account && chainId) {
      yield put(coreActions.setLoading(LoadingState.Updating));
      const newBalance: BigNumber = yield call(
        getAccountNativeBalance,
        chainId,
        account
      );
      yield put(coreActions.setNativeBalance(newBalance.toString()));
      yield put(coreActions.setLoading(LoadingState.Idle));
    }
  } catch {
    yield put(coreActions.setError('Failed to native balance'));
  }
}

function* connectWallet(action: PayloadAction<ConnectWalletPayload>) {
  const {
    payload: { chainId, account },
  } = action;

  if (isNil(chainId) || !isChainIdSupported(chainId)) {
    yield put(userBalancesSlice.actions.setError('Unsupported chain Id'));
    yield put(coreActions.setError('Unsupported chain Id'));
  } else {
    yield put(coreActions.setChainId(chainId));
    yield put(coreActions.setAccount(account));
    yield put(
      userBalanceActions.getUserBalancesStart({
        chainId,
        user: account,
        // TODO Improve the logic when more chains are added
        tokens: [
          getIntAddress(chainId),
          getDNRAddress(chainId),
          getBTCAddress(chainId),
        ],
      })
    );
  }
}

function* watchConnectWallet() {
  yield takeLatest(CoreActionTypes.connectWallet, connectWallet);
}

function* watchUpdateNativeBalance() {
  yield takeLatest(CoreActionTypes.updateNativeBalance, updateNativeBalance);
}

export function* coreSagas(): Generator<
  AllEffect<CallEffect<void>>,
  void,
  unknown
> {
  yield all([call(watchConnectWallet), call(watchUpdateNativeBalance)]);
}
