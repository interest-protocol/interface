import { createSelector } from '@reduxjs/toolkit';
import { identity, path, prop } from 'ramda';

export const getTokenIn = createSelector(path(['swap', 'tokenIn']), identity);

export const getTokenOut = createSelector(path(['swap', 'tokenOut']), identity);

export const getSwapState = createSelector(prop('swap'), identity);
