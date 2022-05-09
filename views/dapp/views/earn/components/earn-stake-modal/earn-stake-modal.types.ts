import { BigNumber } from 'ethers';

import { StakeState } from '@/constants';
import { ERC20, FarmV2, LPPairV2 } from '@/sdk';

export interface EarnStakeModalProps {
  amount: number;
  loading: boolean;
  handleClose: () => void;
  modal: StakeState | undefined;
  farm: FarmV2<ERC20 | LPPairV2>;
  onStake: (value: BigNumber) => Promise<void>;
  onUnstake: (value: BigNumber) => Promise<void>;
}
