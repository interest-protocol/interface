import { path } from 'ramda';

export const getCoinType = path<string>(['details', 'data', 'type']);

export const getCoinBalance = path<string>([
  'details',
  'data',
  'fields',
  'balance',
]);

export const getCoinObjectId = path<string>([
  'details',
  'data',
  'fields',
  'id',
  'id',
]);

export const getTokenTypeFromCoinType = (x: string): string => {
  const array = x.split('<');
  const sndElem = array[1];
  return sndElem.substring(0, sndElem.length - 1);
};

export const addCoinTypeToTokenType = (x: string): string =>
  `0x2::coin::Coin<${x}>`;
