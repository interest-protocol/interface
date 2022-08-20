import { BigNumber } from 'ethers';
import { KeyedMutator } from 'swr';

import { InterestViewEarn } from '../../../../../../types/ethers-contracts/InterestViewEarnAbi';
import { SafeUserFarmData } from '../../earn-farm.types';

export interface EarnFarmOptionsProps {
  farm: SafeUserFarmData;
  intUSDPrice: BigNumber;
  mutate: KeyedMutator<
    [
      InterestViewEarn.PoolDataStructOutput,
      InterestViewEarn.PoolDataStructOutput,
      InterestViewEarn.MintDataStructOutput,
      InterestViewEarn.UserFarmDataStructOutput,
      BigNumber[]
    ] & {
      ipxPoolData: InterestViewEarn.PoolDataStructOutput;
      poolData: InterestViewEarn.PoolDataStructOutput;
      mintData: InterestViewEarn.MintDataStructOutput;
      farmData: InterestViewEarn.UserFarmDataStructOutput;
      prices: BigNumber[];
    }
  >;
  loading: boolean;
}
