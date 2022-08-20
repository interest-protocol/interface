import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { KeyedMutator } from 'swr';

import { InterestViewEarn } from '../../../../../../types/ethers-contracts/InterestViewEarnAbi';
import { IEarnForm, SafeFarmSummaryData } from '../../earn.types';

export interface EarnTableProps {
  loading: boolean;
  isDesktop: boolean;
  farms: SafeFarmSummaryData['farms'];
  intUSDPrice: BigNumber;
  mutate: KeyedMutator<
    [
      InterestViewEarn.PoolDataStructOutput[],
      InterestViewEarn.MintDataStructOutput,
      BigNumber[]
    ] & {
      pools: InterestViewEarn.PoolDataStructOutput[];
      mintData: InterestViewEarn.MintDataStructOutput;
      prices: BigNumber[];
    }
  >;
  control: Control<IEarnForm>;
}

export interface EarnCardProps {
  title: string;
  amount: string;
  shadow?: boolean;
  loading: boolean;
  amountUSD: string;
  button: ReactNode;
}

export interface EarnTableCollapsibleProps {
  farm: SafeFarmSummaryData['farms'][number];
  intUSDPrice: SafeFarmSummaryData['intUSDPrice'];
  mutate: EarnTableProps['mutate'];
  loading: boolean;
}
