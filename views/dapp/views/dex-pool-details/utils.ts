import { BigNumber } from 'ethers';

import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { isZeroAddress } from '@/utils';

import { PairMetadataStructOutput } from '../../../../types/ethers-contracts/InterestViewDexAbi';

export const processPairMailMetadata = (
  data: PairMetadataStructOutput | undefined
) => {
  if (!data) {
    const defaultERC20Metadata = {
      name: '???',
      symbol: '???',
      decimals: ZERO_BIG_NUMBER,
    };

    return {
      token0Metadata: defaultERC20Metadata,
      token1Metadata: defaultERC20Metadata,
      token0: ZERO_ADDRESS,
      token1: ZERO_ADDRESS,
      isStable: false,
      reserve0: ZERO_BIG_NUMBER,
      reserve1: ZERO_BIG_NUMBER,
      doesPairExist: true, // just to show the UI while loading and for users who are not connected
    };
  }

  return { ...data, doesPairExist: !isZeroAddress(data.token0) };
};

export const processBalanceAndAllowance = (
  data:
    | ([BigNumber, BigNumber] & { allowance: BigNumber; balance: BigNumber })
    | undefined
) =>
  data
    ? { allowance: data.allowance, balance: data.allowance }
    : {
        allowance: ZERO_BIG_NUMBER,
        balance: ZERO_BIG_NUMBER,
      };

export const processQuoteRemoveLiquidityData = (
  data:
    | ([BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber })
    | undefined
) =>
  data
    ? { loading: false, amountA: data.amountA, amountB: data.amountB }
    : { loading: true, amountA: ZERO_BIG_NUMBER, amountB: ZERO_BIG_NUMBER };
