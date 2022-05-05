import { BigNumber } from 'ethers';

import { StakeState } from '@/constants';

export interface EarnStakeModalProps {
  poolId: number;
  symbol: string;
  balance: number;
  handleClose: () => void;
  modal: StakeState | undefined;
  onStake: (value: BigNumber) => Promise<void>;
  onUnstake: (value: BigNumber) => Promise<void>;
}