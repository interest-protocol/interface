import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import BTCDineroMarketABI from '@/constants/abi/btc-dinero-market.abi.json';
import ERC20ABI from '@/constants/abi/erc-20.abi.json';
import { IntMath } from '@/sdk/entities/int-math';

import { BtcDineroMarketAbi, Erc20Abi } from '../../types/ethers-contracts';
import { GetDineroMarketUserDataReturn } from './dinero-market.types';

export const getDineroMarketLoan = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.borrow(userAccount, amount);
};

export const addDineroMarketCollateral = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  collateral: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.addCollateral(userAccount, amount);
};

export const getDineroMarketUserData = async (
  dineroMarket: string,
  userAccount: string,
  provider: Web3Provider,
  collateral: string
): Promise<GetDineroMarketUserDataReturn> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider
  ) as BtcDineroMarketAbi;

  const erc20 = new ethers.Contract(collateral, ERC20ABI, provider) as Erc20Abi;

  const [
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
    allowance,
  ] = await Promise.all([
    market.exchangeRate(),
    market.loan(),
    market.liquidationFee(),
    market.maxLTVRatio(),
    market.userCollateral(userAccount),
    market.userLoan(userAccount),
    market.totalLoan(),
    erc20.allowance(userAccount, dineroMarket),
  ]);

  return {
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
    allowance,
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

export const calculateExpectedLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  additionalBorrow: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal).add(
    additionalBorrow
  );
  return userElasticLoan.div(IntMath.from(ltv).mul(userCollateral));
};

export const calculatePositionHealth = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  additionalBorrow: BigNumber
): IntMath => {
  if (userCollateral.isZero())
    return IntMath.from(ethers.utils.parseEther('100'));
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal).add(
    additionalBorrow
  );

  return IntMath.from(ethers.utils.parseEther('100')).sub(
    userElasticLoan.div(IntMath.from(ltv).mul(userCollateral))
  );
};

export const calculateLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  return userElasticLoan.div(IntMath.from(ltv).mul(userCollateral));
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

export const calculateBorrowAmount = (
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber,
  intendedLTV: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);

  return IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(intendedLTV)
    .sub(userElasticLoan);
};
