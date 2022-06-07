import { BigNumber } from 'ethers';

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

  return contract.getManyMailSummaryData(...rest);
};

export const getMAILMarketMetadata = (chainId: number, token: string) => {
  const contract = getInterestViewMAILContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getMAILMarketMetadata(token);
};

export const getMAILMarketData = (
  chainId: number,
  mailMarket: string,
  account: string
) => {
  const contract = getInterestViewMAILContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getMAILPoolData(mailMarket, account);
};

export const getMailBorrowRate = (
  chainId: number,
  mailMarket: string,
  token: string,
  amount: BigNumber,
  isRiskyToken: boolean
) => {
  const contract = getInterestViewMAILContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getBorrowRate(mailMarket, token, amount, isRiskyToken);
};
