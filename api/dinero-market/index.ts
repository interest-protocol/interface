import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';

import { TOKEN_SYMBOL } from '@/sdk';
import { getERC20InterestMarket } from '@/utils/contracts';

export const repayAndWithdrawCollateral = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  collateral: BigNumber,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.repayAndWithdrawCollateral(
    userAccount,
    principal,
    userAccount,
    collateral
  );
};

export const addCollateralAndLoan = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  collateral: BigNumber,
  loan: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.addCollateralAndBorrow(
    userAccount,
    collateral,
    userAccount,
    loan
  );
};

export const repayDineroLoan = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.repay(userAccount, principal);
};

export const getDineroMarketLoan = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.borrow(userAccount, amount);
};

export const withdrawDineroCollateral = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.withdrawCollateral(userAccount, amount);
};

export const addDineroMarketCollateral = async (
  chainId: number,
  signer: JsonRpcSigner,
  tokenSymbol: TOKEN_SYMBOL,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = getERC20InterestMarket(chainId, tokenSymbol, signer);

  return market.addCollateral(userAccount, amount);
};
