import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { splitAt } from 'ramda';

import { mintFaucetToken } from '@/api';
import { CHAIN_ID, CONTRACTS } from '@/sdk';
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
            balance: recommendedBalances[index],
          }))
        : [],
    localData:
      localTokens.length === localBalances.length
        ? localTokens.map((x, index) => ({
            ...x,
            balance: localBalances[index],
          }))
        : [],
  };
};

export const getTokenMinter = (chainId: number, token: string) => {
  const dnr = getDNRAddress(chainId);

  return isSameAddress(token, dnr) ? CONTRACTS.DINERO_FAUCET[chainId] : token;
};

const MINT_FN_RECORD = {
  [getAddress(CONTRACTS.DINERO_FAUCET[CHAIN_ID.BNB_TEST_NET])]:
    mintFaucetToken.old,
  [getAddress(CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET])]: mintFaucetToken.old,
};

export const mint = (
  signer: JsonRpcSigner,
  token: string,
  account: string,
  amount: BigNumber
) => {
  const fn = MINT_FN_RECORD[getAddress(token)];

  return fn
    ? fn(signer, token, amount)
    : mintFaucetToken.new(signer, token, account, amount);
};
