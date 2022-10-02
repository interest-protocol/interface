import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { splitAt } from 'ramda';

import { CONTRACTS } from '@/sdk';
import { getDNRAddress, isSameAddress } from '@/utils';

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
    | Result
) => {
  if (!data) return { recommendedData: [], localData: [] };

  const mailTokensLength = mailTokens.length;

  const [recommendedBalances, localBalances] = splitAt(
    mailTokensLength,
    data.balances
  );

  return {
    recommendedData:
      mailTokensLength === recommendedBalances.length
        ? mailTokens.map((x, index) => ({
            ...x,
            balance: recommendedBalances[index] as BigNumber,
          }))
        : [],
    localData:
      localTokens.length === localBalances.length
        ? localTokens.map((x, index) => ({
            ...x,
            balance: localBalances[index] as BigNumber,
          }))
        : [],
  };
};

export const getTokenMinter = (chainId: number, token: string) => {
  const dnr = getDNRAddress(chainId);

  return isSameAddress(token, dnr) ? CONTRACTS.DINERO_FAUCET[chainId] : token;
};
