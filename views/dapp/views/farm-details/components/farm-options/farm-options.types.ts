import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';

import { StakeState } from '@/constants';

import { SafeUserFarmData } from '../../farm-details.types';

export interface FarmOptionsProps {
  farm: SafeUserFarmData;
  intUSDPrice: BigNumber;
  refetch: () => Promise<void>;
  loading: boolean;
  modalState: {
    modal: StakeState | undefined;
    setModal: Dispatch<SetStateAction<StakeState | undefined>>;
  };
}
