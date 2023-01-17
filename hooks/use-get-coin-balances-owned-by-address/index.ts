import {
  GetObjectDataResponse,
  getObjectFields,
  Network,
} from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { pathOr, propOr } from 'ramda';
import useSWR from 'swr';

import { COIN_TYPE_TO_NAME } from '@/constants';
import {
  makeSWRKey,
  parseBigNumberish,
  provider,
  ZERO_BIG_NUMBER,
} from '@/utils';

interface CoinData {
  balance: BigNumber;
  type: string;
  name: string;
  id: string;
}

const getType = pathOr('', ['details', 'data', 'type']);

const parseData = (data: GetObjectDataResponse[]) => {
  const parsedData = data.reduce((acc, x) => {
    const fields = getObjectFields(x);
    const currentCoin = acc.find((elem) => elem.type === getType(x));
    const currentCoinBalance = parseBigNumberish(
      propOr(ZERO_BIG_NUMBER, 'balance', currentCoin)
    );

    return currentCoin
      ? acc.map((coin) => {
          return coin.type === currentCoin.type
            ? { ...coin, balance: coin.balance.plus(currentCoinBalance) }
            : coin;
        })
      : [
          ...acc,
          {
            id: pathOr('', ['id', 'id'], fields),
            type: getType(x),
            name: pathOr(
              'unknown',
              [Network.DEVNET, getType(x)],
              COIN_TYPE_TO_NAME
            ),
            balance: currentCoinBalance,
          },
        ];
  }, [] as ReadonlyArray<CoinData>);

  return {
    data,
    parsedData,
  };
};

export const useGetCoinBalancesOwnedByAddress = (account: string) => {
  const { data, ...rest } = useSWR(
    makeSWRKey([account], 'getCoinBalancesOwnedByAddress'),
    async () => provider.getCoinBalancesOwnedByAddress(account)
  );

  return {
    ...rest,
    data: data ? parseData(data) : data,
  };
};
