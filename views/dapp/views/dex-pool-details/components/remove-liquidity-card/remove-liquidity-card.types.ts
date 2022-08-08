import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { KeyedMutator } from 'swr';

import { PairMetadataStructOutput } from '../../../../../../types/ethers-contracts/InterestViewDexAbi';

interface TokenData {
  symbol: string;
  Icon: ReactNode;
  decimals: number;
  address: string;
}

export interface RemoveLiquidityCardProps {
  isStable: boolean;
  tokens: [TokenData, TokenData];
  lpBalance: BigNumber;
  lpAllowance: BigNumber;
  pairAddress: string;
  isFetchingInitialData: boolean;
  mutate: KeyedMutator<
    [PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
      pairMetadata: PairMetadataStructOutput;
      allowances: BigNumber[];
      balances: BigNumber[];
    }
  >;
}

export interface IRemoveLiquidityForm {
  loading: boolean;
  lpAmount: string;
  token0Amount: string;
  token1Amount: string;
}

export interface InputBalanceProps {
  balance: number;
  disabled?: boolean;
  currencyPrefix: ReactNode;
  name: keyof IRemoveLiquidityForm;
  register: UseFormRegister<IRemoveLiquidityForm>;
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
}

export interface TokenAmountProps {
  Icon: TokenData['Icon'];
  control: Control<IRemoveLiquidityForm>;
  symbol: string;
  name: Exclude<keyof IRemoveLiquidityForm, 'lpAmount'>;
  isFetchingInitialData: boolean;
}

export interface RemoveLiquidityManagerProps {
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
  control: Control<IRemoveLiquidityForm>;
  isStable: boolean;
  token0Address: string;
  token1Address: string;
  token0Decimals: number;
  token1Decimals: number;
  chainId: number;
}
