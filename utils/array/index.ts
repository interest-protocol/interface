import { append, curryN, flip } from 'ramda';

export const flippedAppend = curryN(2, flip(append));
