import { createAction } from '@reduxjs/toolkit';

import { GetUserBalancesStartPayload } from './user-balances.types';

export const UserBalancesActionTypes = {
  getUserBalancesStart: 'userBalances/getUserBalancesStart',
};

const getUserBalancesStart = createAction<GetUserBalancesStartPayload>(
  UserBalancesActionTypes.getUserBalancesStart
);

export const userBalanceActions = {
  getUserBalancesStart,
};
