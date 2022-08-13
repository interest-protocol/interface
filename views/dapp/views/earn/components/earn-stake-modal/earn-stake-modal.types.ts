import { BigNumber } from 'ethers';

import { StakeState } from '@/constants';

import { SafeFarmData } from '../../earn.types';

export interface EarnStakeModalProps {
  amount: number;
  loading: boolean;
  handleClose: () => void;
  modal: StakeState | undefined;
  farm: SafeFarmData;
  onStake: (value: BigNumber) => Promise<void>;
  onUnstake: (value: BigNumber) => Promise<void>;
  farmSymbol: string;
}
