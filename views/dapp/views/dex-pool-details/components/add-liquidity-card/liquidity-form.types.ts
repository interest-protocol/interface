import { BigNumber } from 'ethers';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { KeyedMutator } from 'swr';

import { PairMetadataStructOutput } from '../../../../../../types/ethers-contracts/InterestViewDexAbi';

export interface IAddLiquidityForm {
  token0Amount: string;
  token1Amount: string;
  error: string;
  locked: boolean;
}

export interface IToken {
  symbol: string;
  Icon: ReactNode;
  decimals: number;
  balance: BigNumber;
  allowance: BigNumber;
  address: string;
}

export interface AddLiquidityCardProps {
  isStable: boolean;
  tokens: [IToken, IToken];
  fetchingInitialData: boolean;
  mutate: KeyedMutator<
    [PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
      pairMetadata: PairMetadataStructOutput;
      allowances: BigNumber[];
      balances: BigNumber[];
    }
  >;
}

export interface AddLiquidityManagerProps {
  chainId: number;
  isFetchingQuote: boolean;
  setIsFetchingQuote: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<IAddLiquidityForm>;
  control: Control<IAddLiquidityForm>;
  tokens: AddLiquidityCardProps['tokens'];
  isStable: boolean;
}

export interface BalanceErrorProps {
  control: Control<IAddLiquidityForm>;
  balance: BigNumber;
  name: Exclude<keyof IAddLiquidityForm, 'error' | 'locked'>;
  decimals: number;
  symbol: string;
}
