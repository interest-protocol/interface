import { BigNumber } from 'ethers';

import { SafeUserFarmData } from '../../earn-farm.types';

export interface EarnFarmOptionsProps {
  farm: SafeUserFarmData;
  intUSDPrice: BigNumber;
  refetch: () => Promise<void>;
  loading: boolean;
}
