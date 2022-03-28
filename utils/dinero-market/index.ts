import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

import BTCDineroMarketABI from '@/constants/abi/btc-dinero-market.abi.json';
import { IntMath } from '@/sdk/entities/int-math';

import { BtcDineroMarketAbi } from '../../types/ethers-contracts';
import { GetDineroMarketUserDataReturn } from './dinero-market.types';

export const getDineroMarketUserData = async (
  dineroMarket: string,
  userAccount: string,
  provider: Web3Provider
): Promise<GetDineroMarketUserDataReturn> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider
  ) as BtcDineroMarketAbi;

  const [
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
  ] = await Promise.all([
    market.exchangeRate(),
    market.loan(),
    market.liquidationFee(),
    market.maxLTVRatio(),
    market.userCollateral(userAccount),
    market.userLoan(userAccount),
    market.totalLoan(),
  ]);

  return {
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
  };
};

export const loanPrincipalToElastic = (
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userPrincipal: BigNumber
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(0);
  return IntMath.from(userPrincipal).mul(totalLoan.elastic).div(totalLoan.base);
};

export const calculateUserLTVRatio = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral);
  return userElasticLoan.div(collateral);
};

export const calculateLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return userElasticLoan.div(collateral.mul(ltv));
};

export const calculateDineroLeftToBorrow = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return collateral.mul(ltv).sub(userElasticLoan);
};

export const safeAmountToWithdraw = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return collateral.sub(userElasticLoan.div(ltv));
};
