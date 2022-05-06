import { BigNumber } from 'ethers';

import { StakeState } from '@/constants';
import { ERC20, FarmV2, LPPairV2 } from '@/sdk';

export interface EarnStakeModalProps {
  farm: FarmV2<ERC20 | LPPairV2>;
  amount: number;
  handleClose: () => void;
  modal: StakeState | undefined;
  onStake: (value: BigNumber) => Promise<void>;
  onUnstake: (value: BigNumber) => Promise<void>;
}
