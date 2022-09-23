import { ethers } from 'ethers';
import { Control, useWatch } from 'react-hook-form';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { StakeState } from '@/constants';
import { useDebounce } from '@/hooks';
import CasaDePapelABI from '@/sdk/abi/casa-de-papel.abi.json';
import { getCasaDePapelAddress, safeToBigNumber } from '@/utils';

import { SafeUserFarmData } from '../../earn-farm.types';

export const useAction = (
  farm: SafeUserFarmData,
  control: Control<{ value: string }>,
  modal: StakeState | undefined
) => {
  const amount = useDebounce(
    safeToBigNumber(useWatch({ control, name: 'value' }) || '0'),
    500
  );

  const balanceLimit =
    modal === StakeState.Stake ? farm.balance : farm.stakingAmount;

  const { config } = usePrepareContractWrite({
    addressOrName: getCasaDePapelAddress(farm.chainId),
    contractInterface: CasaDePapelABI,
    functionName: modal === StakeState.Stake ? 'stake' : 'unstake',
    args: [
      farm.id,
      amount.add(ethers.utils.parseEther('1')).gt(balanceLimit)
        ? balanceLimit
        : amount,
    ],
    enabled: !balanceLimit.isZero() && !amount.isZero() && !!modal,
  });

  return useContractWrite(config);
};
