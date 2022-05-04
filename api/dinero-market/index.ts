import { BigNumber, ContractTransaction } from 'ethers';

import { TOKEN_SYMBOL } from '@/sdk';
import { getERC20InterestMarket } from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

export const repayAndWithdrawCollateral = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  collateral: BigNumber,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.repayAndWithdrawCollateral(
    userAccount,
    principal,
    userAccount,
    collateral
  );
};

export const addCollateralAndLoan = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  collateral: BigNumber,
  loan: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.addCollateralAndBorrow(
    userAccount,
    collateral,
    userAccount,
    loan
  );
};

export const repayDineroLoan = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.repay(userAccount, principal);
};

export const getDineroMarketLoan = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.borrow(userAccount, amount);
};

export const withdrawDineroCollateral = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.withdrawCollateral(userAccount, amount);
};

export const addDineroMarketCollateral = async (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(
    chainId,
    tokenSymbol,
    getStaticWeb3Provider(chainId).getSigner(userAccount)
  );

  return market.addCollateral(userAccount, amount);
};
