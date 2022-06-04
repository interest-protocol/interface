import { BigNumber } from 'ethers';
import { splitAt } from 'ramda';

import { IToken } from './faucet.types';

export const processGetUserBalances = (
  mailTokens: ReadonlyArray<IToken>,
  localTokens: ReadonlyArray<IToken>,
  data:
    | ([BigNumber, BigNumber[]] & {
        nativeBalance: BigNumber;
        balances: BigNumber[];
      })
    | undefined
) => {
  if (!data) return { recommendedData: [], localData: [] };

  const mailTokensLength = mailTokens.length;

  const [recommendedBalances, localBalances] = splitAt(
    mailTokensLength,
    data.balances
  );

  return {
    recommendedData: recommendedBalances.map((balance, index) => ({
      ...mailTokens[index],
      balance,
    })),
    localData: localBalances.map((balance, index) => ({
      ...localTokens[index],
      balance,
    })),
  };
};
