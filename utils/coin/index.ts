import { path } from 'ramda';

export const getCoinType = path<string>(['details', 'data', 'type']);
export const getCoinBalance = path<string>([
  'details',
  'data',
  'fields',
  'balance',
]);
