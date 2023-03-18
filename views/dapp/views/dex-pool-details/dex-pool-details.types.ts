import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PairMetadataStructOutput } from 'types/ethers-contracts/InterestViewDexAbi';

import { IAddLiquidityForm } from './components/add-liquidity-card/add-liquidity-card.types';
import { IRemoveLiquidityForm } from './components/remove-liquidity-card/remove-liquidity-card.types';

export interface DEXPoolDetailsViewProps {
  pairAddress: `0x${string}`;
  chainId: number;
  account: string;
  isFetchingQuoteState: {
    isFetchingQuote: boolean;
    setIsFetchingQuote: Dispatch<SetStateAction<boolean>>;
  };
  loadingState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  formAddLiquidity: UseFormReturn<IAddLiquidityForm>;
  formRemoveLiquidity: UseFormReturn<IRemoveLiquidityForm>;
  lastDebouncedAmountState: {
    lastDebouncedAmount: string;
    setLastDebouncedAmount: Dispatch<SetStateAction<string>>;
  };
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
  address: string;
  isFetchingInitialData: boolean;
  chainId: number;
}

export interface LiquidityDetailsCardProps {
  isStable: boolean;
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}

export type TPoolDetailsKeys =
  | 'token0Metadata'
  | 'token1Metadata'
  | 'token0'
  | 'token1'
  | 'isStable'
  | 'reserve0'
  | 'reserve1';

export type TDexPoolDetailsData =
  | ([PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
      pairMetadata: PairMetadataStructOutput;
      allowances: BigNumber[];
      balances: BigNumber[];
    })
  | undefined
  | Result;

export type TProcessPairData = (
  chainId: number,
  data: TDexPoolDetailsData,
  nativeBalance: string
) => {
  token0Metadata: {
    name: string;
    symbol: string;
    decimals: number;
  };
  token1Metadata: {
    name: string;
    symbol: string;
    decimals: number;
  };
  loading: boolean;
  pairExists: boolean;
  token0: `0x${string}`;
  token1: `0x${string}`;
  isStable: boolean;
  reserve0: BigNumber;
  reserve1: BigNumber;
  lpAllowance: BigNumber;
  lpBalance: BigNumber;
  token0Balance: BigNumber;
  token0Allowance: BigNumber;
  token1Balance: BigNumber;
  token1Allowance: BigNumber;
};
