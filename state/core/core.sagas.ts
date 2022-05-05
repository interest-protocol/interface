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

import { isChainIdSupported } from '@/constants/chains';
import { ConnectWalletPayload } from '@/state/core/core.types';
import { userBalancesSlice } from '@/state/user-balances';
import { userBalanceActions } from '@/state/user-balances/user-balances.actions';
import { getBTCAddress, getDNRAddress, getIntAddress } from '@/utils/contracts';

import { coreActions, CoreActionTypes } from './core.actions';

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

export function* coreSagas(): Generator<
  AllEffect<CallEffect<void>>,
  void,
  unknown
> {
  yield all([call(watchConnectWallet)]);
}
