import { propOr } from 'ramda';

import { CASA_DE_PAPEL_FARM_CALL_MAP, DEFAULT_ACCOUNT } from '@/constants';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useIdAccount } from '../use-id-account';
import { useSafeContractRead } from '../use-safe-contract-read';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const { chainId, account } = useIdAccount();

  const data = propOr({}, chainId.toString(), CASA_DE_PAPEL_FARM_CALL_MAP);

  return useSafeContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getFarmsSummary',
    args: [
      account || DEFAULT_ACCOUNT,
      prop('pairs', data),
      prop('poolIds', data),
      prop('baseTokens', data),
    ],
    onError: () =>
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page: GAPage.Farms,
        functionName: 'getFarmsSummary',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page: GAPage.Farms,
        functionName: 'getFarmsSummary',
      }),
  });
};
