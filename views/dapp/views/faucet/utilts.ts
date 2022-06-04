import { BigNumber } from 'ethers';

import { IToken } from './faucet.types';

export const processGetUserBalances = (
  tokens: ReadonlyArray<IToken>,
  data:
    | ([BigNumber, BigNumber[]] & {
        nativeBalance: BigNumber;
        balances: BigNumber[];
      })
    | undefined
) =>
  data
    ? data.balances.map((balance, index) => ({ ...tokens[index], balance }))
    : [];
