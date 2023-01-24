import { Network, SuiObjectInfo } from '@mysten/sui.js';
import { isEmpty, pathOr } from 'ramda';

import { Web3ManagerState } from '@/components/web3-manager/web3-manager.types';
import { COIN_TYPE, DEX_BASE_TOKEN_ARRAY } from '@/constants';
import { FixedPointMath } from '@/sdk';
import { addCoinTypeToTokenType, getCoinBalance } from '@/utils';

import { PoolsMap, SwapPathObject } from './swap.types';

export const parsePools = (data: undefined | SuiObjectInfo[]) => {
  if (!data) return {};

  return data.reduce((acc, elem) => {
    const type = elem.type.split('PoolId');
    const tokensTypes = type[1].split(',');
    const tokenInType = tokensTypes[0].substring(1);
    const tokenOutType = tokensTypes[1].substring(1, tokensTypes[1].length - 2);

    const parsedTokenIn = addCoinTypeToTokenType(tokenInType);
    const parsedTokenOut = addCoinTypeToTokenType(tokenOutType);

    if (!acc[parsedTokenIn]) acc[parsedTokenIn] = {};
    if (!acc[parsedTokenOut]) acc[parsedTokenOut] = {};

    return {
      ...acc,
      [parsedTokenIn]: {
        ...acc[parsedTokenIn],
        [parsedTokenOut]: elem,
      },
      [parsedTokenOut]: {
        ...acc[parsedTokenOut],
        [parsedTokenIn]: elem,
      },
    };
  }, {} as PoolsMap);
};

export const findMarket = (
  data: PoolsMap,
  tokenInType: string,
  tokenOutType: string
): ReadonlyArray<SwapPathObject> => {
  if (isEmpty(data)) return [];

  const pool = data[tokenInType][tokenOutType];

  // direct X/Y pool
  if (pool)
    return [
      {
        baseToken: null,
        tokenInType,
        tokenOutType,
        pools: [pool],
      },
    ];

  const result = DEX_BASE_TOKEN_ARRAY.reduce(
    (acc, element): ReadonlyArray<SwapPathObject> => {
      const firstPool = pathOr(null, [tokenInType, element], data);
      const secondPool = pathOr(null, [tokenOutType, element], data);

      if (firstPool && secondPool)
        return [
          ...acc,
          {
            baseToken: element,
            tokenOutType,
            tokenInType,
            pools: [firstPool!, secondPool!],
          },
        ];

      return acc;
    },
    [] as ReadonlyArray<SwapPathObject>
  );

  return result;
};

export const getCoinIds = (
  coinsMap: Web3ManagerState['coinsMap'],
  type: string
) => {
  if (type === COIN_TYPE[Network.DEVNET].SUI) {
    const suiObjects = [...coinsMap[type].objects];
    const gasObjectIndex = suiObjects
      .sort((a, b) => (+getCoinBalance(a)! > +getCoinBalance(b)! ? 1 : -1))
      .findIndex((elem) =>
        FixedPointMath.toBigNumber(getCoinBalance(elem) || '0').gte(
          FixedPointMath.toBigNumber(5000)
        )
      );
    return suiObjects
      .filter((_, index) => index !== gasObjectIndex)
      .map((elem) =>
        pathOr('', ['details', 'data', 'fields', 'id', 'id'], elem)
      );
  }

  return coinsMap[type].objects.map((elem) =>
    pathOr('', ['details', 'data', 'fields', 'id', 'id'], elem)
  );
};
