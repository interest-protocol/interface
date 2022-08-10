import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import { InterestViewEarn } from '../../../../../../types/ethers-contracts/InterestViewEarnAbi';
import { SafeFarmSummaryData } from '../../earn.types';

export interface EarnTableProps {
  loading: boolean;
  isPools?: boolean;
  isDesktop: boolean;
  farms: SafeFarmSummaryData['farms'];
  intUSDPrice: BigNumber;
  mutate: KeyedMutator<
    [
      InterestViewEarn.PoolDataStructOutput[],
      InterestViewEarn.MintDataStructOutput,
      BigNumber[],
      InterestViewEarn.UserFarmDataStructOutput[]
    ] & {
      pools: InterestViewEarn.PoolDataStructOutput[];
      mintData: InterestViewEarn.MintDataStructOutput;
      prices: BigNumber[];
      farmDatas: InterestViewEarn.UserFarmDataStructOutput[];
    }
  >;
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
