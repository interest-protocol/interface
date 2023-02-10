import { append, curryN, flip } from 'ramda';

export const flippedAppend = curryN(2, flip(append));

export const hasKeys = <T>(keys: ReadonlyArray<string>, data: T): boolean =>
  keys.every(
    (key) => (data as Record<string | number, unknown>)[key] !== undefined
  );
