import { StakeState } from '@/constants';

import { SafeUserFarmData } from '../../earn-farm.types';

export interface EarnStakeModalProps {
  amount: number;
  handleClose: () => void;
  modal: StakeState | undefined;
  farm: SafeUserFarmData;
  farmSymbol: string;
  refetch: () => Promise<void>;
}
