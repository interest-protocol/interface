import { Network } from '@mysten/sui.js';
import { GetObjectDataResponse } from '@mysten/sui.js/src/types';
import { path, pathOr } from 'ramda';

import { COIN_TYPE_TO_NAME } from '@/constants';
import { parseBigNumberish } from '@/utils';

import { Web3ManagerSuiObject } from './web3-manager.types';

const getType = path<string>(['details', 'data', 'type']);
const getBalance = path<string>(['details', 'data', 'fields', 'balance']);

export const parseCoins = (data: GetObjectDataResponse[] | undefined) => {
  if (!data)
    return [[], {}] as [
      ReadonlyArray<Web3ManagerSuiObject>,
      Record<string, Web3ManagerSuiObject>
    ];
  return data.reduce(
    (acc, object) => {
      const type = getType(object);
      const list = acc[0];
      const map = acc[1];
      const currentCoinBalance = parseBigNumberish(getBalance(object));

      if (type) {
        const currentCoin = map[type];

        if (currentCoin) {
          const updatedMap = {
            ...map,
            [type]: {
              ...currentCoin,
              totalBalance: currentCoin.totalBalance.plus(currentCoinBalance),
              object: [...currentCoin.objects, object],
            },
          };

          const updatedList = list.map((elem) => {
            if (elem.type === type) {
              return {
                ...elem,
                totalBalance: elem.totalBalance.plus(currentCoinBalance),
                object: [...elem.objects, object],
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
        const updatedMap = {
          ...map,
          [type]: {
            type,
            name,
            totalBalance: currentCoinBalance,
            object: [object],
          },
        };

        const updatedList = [
          ...list,
          {
            type,
            name,
            totalBalance: currentCoinBalance,
            object: [object],
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
