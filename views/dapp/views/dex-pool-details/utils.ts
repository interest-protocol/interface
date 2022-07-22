import { BigNumber } from 'ethers';

import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';

import { PairMetadataStructOutput } from '../../../../types/ethers-contracts/InterestViewDexAbi';

export const processPairData = (
  data:
    | ([PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
        pairMetadata: PairMetadataStructOutput;
        allowances: BigNumber[];
        balances: BigNumber[];
      })
    | undefined
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
    };
  }

  return data;
};

export const processQuoteRemoveLiquidityData = (
  data:
    | ([BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber })
    | undefined
) =>
  data
    ? { loading: false, amountA: data.amountA, amountB: data.amountB }
    : { loading: true, amountA: ZERO_BIG_NUMBER, amountB: ZERO_BIG_NUMBER };
