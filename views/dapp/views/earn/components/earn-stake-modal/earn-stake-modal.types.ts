import { BigNumber } from 'ethers';

import { PoolId } from '@/constants/farms';

export interface EarnStakeModalProps {
  id: PoolId;
  symbol: string;
  balance: BigNumber;
  handleClose: () => void;
  modal: 'stake' | 'unstake' | undefined;
  onStake: (value: BigNumber) => Promise<void>;
  onUnstake: (value: BigNumber) => Promise<void>;
}
