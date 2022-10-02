import { Control } from 'react-hook-form';

import { StakeState } from '@/constants';

import { SafeUserFarmData } from '../../earn-farm.types';

export interface ApproveButtonProps {
  refetch: () => Promise<void>;
  farm: SafeUserFarmData;
}

export interface HarvestButtonProps {
  refetch: () => Promise<void>;
  farm: SafeUserFarmData;
}

export interface ModalButtonProps {
  farm: SafeUserFarmData;
  modal: StakeState | undefined;
  control: Control<{ value: string }>;
  handleClose: () => void;
  refetch: () => Promise<void>;
  isStake: boolean;
}
