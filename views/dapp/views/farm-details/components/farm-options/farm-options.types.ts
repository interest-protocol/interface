import { BigNumber } from 'ethers';

import { SafeUserFarmData } from '../../farm-details.types';

export interface FarmOptionsProps {
  farm: SafeUserFarmData;
  intUSDPrice: BigNumber;
  refetch: () => Promise<void>;
  loading: boolean;
}
