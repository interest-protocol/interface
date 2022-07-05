import { createReducer } from '@reduxjs/toolkit';

import { NO_STATE_ERROR } from '@/constants';
import { SwapState } from '@/state/swap/swap.types';
import { isSameAddress } from '@/utils';

import { swapActions } from './swap.actions';

const initialState = {
  tokenIn: '',
  tokenOut: '',
  isSwapping: false,
  isFetchingOutputAmount: false,
  swapError: NO_STATE_ERROR,
  fetchingOutPutError: NO_STATE_ERROR,
  tokenInAmount: '',
  tokenOutAmount: '',
  priceImpact: 0,
  tradeType: 'auto' as const,
};

const { setTokenIn, setTokenOut, flipTokens, setTokenAmount, setInitialData } =
  swapActions;

export const swapReducer = createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(flipTokens, (state) => {
      const tokenIn = state.tokenIn;
      const tokenOut = state.tokenOut;
      state.tokenOut = tokenIn;
      state.tokenIn = tokenOut;
    })
    .addCase(setTokenIn, (state, action) => {
      state.tokenIn = action.payload;
    })
    .addCase(setTokenOut, (state, action) => {
      state.tokenOut = action.payload;
    })
    .addCase(setTokenAmount, (state, action) => {
      state[
        isSameAddress(action.payload.token, state.tokenIn)
          ? 'tokenInAmount'
          : 'tokenOutAmount'
      ] = action.payload.amount;
    })
    .addCase(setInitialData, (state, action) => {
      state.tokenIn = action.payload.tokenIn;
      state.tokenOut = action.payload.tokenOut;
    })
);
