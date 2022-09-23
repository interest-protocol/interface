import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { ZERO_BIG_NUMBER } from '@/sdk';
import CasaDePapelABI from '@/sdk/abi/casa-de-papel.abi.json';
import { getCasaDePapelAddress } from '@/utils';
import { SafeUserFarmData } from '@/views/dapp/views/earn-farm/earn-farm.types';

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
