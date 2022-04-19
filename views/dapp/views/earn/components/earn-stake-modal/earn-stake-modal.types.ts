import { BigNumber } from 'ethers';

import { PoolId } from '@/constants/farms';

export interface EarnStakeModalProps {
  symbol: string;
  balance: BigNumber;
  handleClose: () => void;
  modal: 'stake' | 'unstake' | undefined;
  id: PoolId;
}
