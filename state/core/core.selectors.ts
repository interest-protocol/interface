import { createSelector } from '@reduxjs/toolkit';
import { identity, path, pathOr, prop } from 'ramda';

export const getChainId = createSelector(path(['core', 'chainId']), identity);

export const getNativeBalance = createSelector(
  pathOr('0', ['core', 'nativeBalance']),
  identity
);

export const getCoreData = createSelector(prop('core'), identity);

export const getAccount = createSelector(
  pathOr('', ['core', 'account']),
  identity
);
