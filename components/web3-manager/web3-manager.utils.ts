import { Network } from '@mysten/sui.js';
import { GetObjectDataResponse } from '@mysten/sui.js/src/types';
import { pathOr } from 'ramda';

import { COIN_DECIMALS, COIN_TYPE_TO_NAME } from '@/constants';
import { getCoinBalance, getCoinType, parseBigNumberish } from '@/utils';

import { Web3ManagerSuiObject } from './web3-manager.types';

export const parseCoins = (data: GetObjectDataResponse[] | undefined) => {
  if (!data)
    return [[], {}] as [
      ReadonlyArray<Web3ManagerSuiObject>,
      Record<string, Web3ManagerSuiObject>
    ];

  return data.reduce(
    (acc, object) => {
      const type = getCoinType(object);
      const list = acc[0];
      const map = acc[1];
      const currentCoinBalance = parseBigNumberish(getCoinBalance(object));
      if (type) {
        const currentCoin = map[type];

        if (currentCoin) {
          const updatedMap = {
            ...map,
            [type]: {
              ...currentCoin,
              totalBalance: currentCoin.totalBalance.plus(currentCoinBalance),
              objects: [...currentCoin.objects, object],
            },
          };

          const updatedList = list.map((elem) => {
            if (elem.type === type) {
              return {
                ...elem,
                totalBalance: elem.totalBalance.plus(currentCoinBalance),
                objects: [...elem.objects, object],
              };
            }
            return elem;
          });

          return [updatedList, updatedMap] as [
            ReadonlyArray<Web3ManagerSuiObject>,
            Record<string, Web3ManagerSuiObject>
          ];
        }
        const name = pathOr(type, [Network.DEVNET, type], COIN_TYPE_TO_NAME);
        const decimals = pathOr(0, [Network.DEVNET, type], COIN_DECIMALS);
        const updatedMap = {
          ...map,
          [type]: {
            type,
            name,
            decimals,
            totalBalance: currentCoinBalance,
            objects: [object],
          },
        };

        const updatedList = [
          ...list,
          {
            type,
            name,
            decimals,
            totalBalance: currentCoinBalance,
            objects: [object],
          },
        ];

        return [updatedList, updatedMap] as [
          ReadonlyArray<Web3ManagerSuiObject>,
          Record<string, Web3ManagerSuiObject>
        ];
      }

      return acc;
    },
    [[], {}] as [
      ReadonlyArray<Web3ManagerSuiObject>,
      Record<string, Web3ManagerSuiObject>
    ]
  );
};
