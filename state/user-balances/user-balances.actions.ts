import { createAction } from '@reduxjs/toolkit';

import {
  AddUserBalancesStartPayload,
  GetUserBalancesStartPayload,
  UpdateUserBalancesStartPayload,
} from './user-balances.types';

export const UserBalancesActionTypes = {
  getUserBalancesStart: 'userBalances/getUserBalancesStart',
  addUserBalancesStart: 'userBalances/addUserBalancesStart',
  updateUserBalancesStart: 'userBalances/updateUserBalancesStart',
};

const getUserBalancesStart = createAction<GetUserBalancesStartPayload>(
  UserBalancesActionTypes.getUserBalancesStart
);

const addUserBalancesStart = createAction<AddUserBalancesStartPayload>(
  UserBalancesActionTypes.addUserBalancesStart
);

const updateUserBalancesStart = createAction<UpdateUserBalancesStartPayload>(
  UserBalancesActionTypes.updateUserBalancesStart
);

export const userBalanceActions = {
  getUserBalancesStart,
  addUserBalancesStart,
  updateUserBalancesStart,
};
