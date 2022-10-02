import { ethers } from 'ethers';
import { Control, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { StakeState } from '@/constants';
import { ZERO_BIG_NUMBER } from '@/sdk';
import CasaDePapelABI from '@/sdk/abi/casa-de-papel.abi.json';
import { getCasaDePapelAddress, safeToBigNumber } from '@/utils';

import { SafeUserFarmData } from '../../earn-farm.types';

export const useHarvest = (farm: SafeUserFarmData) => {
  const { config } = usePrepareContractWrite({
    addressOrName: getCasaDePapelAddress(farm.chainId),
    enabled: !farm.pendingRewards.isZero(),
    functionName: 'stake',
    contractInterface: CasaDePapelABI,
    args: [farm.id, ZERO_BIG_NUMBER],
  });

  return useContractWrite(config);
};

export const useAction = (
  farm: SafeUserFarmData,
  control: Control<{ value: string }>,
  modal: StakeState | undefined
) => {
  const [amount] = useDebounce(
    safeToBigNumber(useWatch({ control, name: 'value' }) || '0'),
    500,
    { equalityFn: (x, y) => x.eq(y) }
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
    enabled:
      !balanceLimit.isZero() && !amount.isZero() && typeof modal === 'number',
  });

  return useContractWrite(config);
};
