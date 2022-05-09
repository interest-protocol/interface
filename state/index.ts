import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { isDevelopment } from '@/constants';

import { preloadedState } from './preloaded-state';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    const extraMiddleware = isDevelopment
      ? [logger, sagaMiddleware]
      : [sagaMiddleware];
    return getDefaultMiddleware({ thunk: false }).concat(extraMiddleware);
  },
});

export type ReduxStore = typeof store;

sagaMiddleware.run(rootSaga);
