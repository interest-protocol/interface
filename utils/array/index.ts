import { append, curryN, flip, o } from 'ramda';

export const flippedAppend = curryN(2, flip(append));

export const initSet = (iterable: Iterable<unknown>): Set<unknown> =>
  new Set(iterable);

export const getArrayWithUniqueValues = o<
  Array<unknown>,
  Set<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Array<any>
>(Array.from, initSet);
