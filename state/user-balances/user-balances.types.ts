import { EntityState, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import { LoadingState } from '@/constants';

export interface IUserBalance {
  id: string;
  balance: string;
}

export interface UserBalanceExtraState {
  loading: LoadingState;
  error: string;
}

export type UserBalanceReducerHelperState = WritableDraft<
  EntityState<IUserBalance> & UserBalanceExtraState
>;

export type UserBalanceReducerHelperWithAction<T = IUserBalance> = (
  state: UserBalanceReducerHelperState,
  action: PayloadAction<T>
) => void;

export type UserBalanceReducerHelper = (
  state: UserBalanceReducerHelperState
) => void;

export interface GetUserBalancesStartPayload {
  chainId: number;
  user: string;
  tokens: Array<string>;
}
