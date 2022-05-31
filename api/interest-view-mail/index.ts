import { getInterestViewMAILContract, getStaticWeb3Provider } from '@/utils';

import { GetManyMAILSummaryData } from './interest-view-mail.types';

export const getManyMAILSummaryData: GetManyMAILSummaryData = (
  chainId,
  ...rest
) => {
  const contract = getInterestViewMAILContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );
  console.log(chainId, 'chainid');
  console.log(contract.address);
  console.log(...rest);
  return contract.getManyMailSummaryData(...rest);
};
