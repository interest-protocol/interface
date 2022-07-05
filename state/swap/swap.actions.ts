import { createAction } from '@reduxjs/toolkit';

import { SetInitialData, SetTokenAmountData } from './swap.types';

export const SwapActionTypes = {
  flipTokens: 'swap/flipTokens',
  setTokenAmount: 'swap/setTokenAmount',
  setTokenIn: 'swap/setTokenIn',
  setTokenOut: 'swap/setTokenOut',
  setInitialData: 'swap/setInitialData',
};

const flipTokens = createAction(SwapActionTypes.flipTokens);

const setTokenAmount = createAction<SetTokenAmountData>(
  SwapActionTypes.setTokenAmount
);

const setTokenIn = createAction<string>(SwapActionTypes.setTokenIn);

const setTokenOut = createAction<string>(SwapActionTypes.setTokenOut);

const setInitialData = createAction<SetInitialData>(
  SwapActionTypes.setInitialData
);

export const swapActions = {
  flipTokens,
  setTokenAmount,
  setTokenIn,
  setTokenOut,
  setInitialData,
};
