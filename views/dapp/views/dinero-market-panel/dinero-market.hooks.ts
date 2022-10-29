import { ContractInterface, ethers } from 'ethers';
import { isEmpty } from 'ramda';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DineroMarketKind } from '@/constants';
import { HandlerData } from '@/interface';
import { FixedPointMath, ZERO_ADDRESS } from '@/sdk';
import DineroERC20MarketABI from '@/sdk/abi/dinero-erc-20-market.abi.json';
import DineroLpFreeMarketABI from '@/sdk/abi/dinero-lp-free-market.abi.json';
import DineroNativeMarketABI from '@/sdk/abi/dinero-native-market.abi.json';
import { isValidAccount, isZeroAddress, safeToBigNumber } from '@/utils';

import { DineroMarketData } from './dinero-market.types';
import { loanElasticToPrincipal } from './dinero-market.utils';

const { defaultAbiCoder } = ethers.utils;

const encodeData = (to: string, amount: ethers.BigNumber) =>
  defaultAbiCoder.encode(['address', 'uint256'], [to || ZERO_ADDRESS, amount]);

enum RequestActions {
  Deposit,
  Withdraw,
  Borrow,
  Repay,
}

const handleRepayRequest = (
  market: DineroMarketData,
  account: string,
  collateral: number,
  loan: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  const functionName = 'request';
  let args: any[] = [];
  let enabled = false;
  const overrides = {};
  let contractInterface: ContractInterface = '';

  /**
   * @description We do not need to calculate the elastic loan, because this market does not have any interest rate.
   */
  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const loanBN = FixedPointMath.toBigNumber(loan);
    const safePrincipal = loanBN.gt(market.userPrincipal)
      ? market.userPrincipal
      : loanBN;

    args = [
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ],
    ];
    enabled = !safePrincipal.isZero() && !safePrincipal.isZero();
    contractInterface = DineroLpFreeMarketABI;
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const estimatedPrincipal = loanElasticToPrincipal({
      interestRate: market.interestRate,
      lastAccrued: market.lastAccrued,
      loanElastic: market.loanElastic,
      loanBase: market.loanBase,
      userElastic: safeToBigNumber(loan, 18, 8),
      now: market.now,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    args = [
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ],
    ];
    enabled = !safePrincipal.isZero() && !safePrincipal.isZero();
    contractInterface = DineroERC20MarketABI;
  }

  if (market.kind === DineroMarketKind.Native) {
    const estimatedPrincipal = loanElasticToPrincipal({
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      interestRate: market.interestRate,
      lastAccrued: market.lastAccrued,
      userElastic: safeToBigNumber(loan, 18, 8),
      now: market.now,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    args = [
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ],
    ];
    enabled = !safePrincipal.isZero() && !safePrincipal.isZero();
    contractInterface = DineroNativeMarketABI;
  }

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleRepayCollateral = (
  market: DineroMarketData,
  account: string,
  collateral: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  const functionName = 'withdraw';
  const args: any[] = [account, safeBNCollateral];
  const enabled = !safeBNCollateral.isZero();
  const overrides = {};
  /**
   * @description The withdraw interface should be the same for all contracts.
   */
  const contractInterface = DineroNativeMarketABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleRepayLoan = (
  market: DineroMarketData,
  account: string,
  loan: number
): HandlerData => {
  const loanBN = FixedPointMath.toBigNumber(loan);
  const safeAmount = loanBN.gt(market.dnrBalance) ? market.dnrBalance : loanBN;

  const functionName = 'repay';
  let args: any[] = [];
  const enabled = !safeAmount.isZero();
  const overrides = {};
  /**
   * @description The repay interface should be the same for all contracts.
   */
  const contractInterface = DineroNativeMarketABI;

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    args = [
      account,
      safeAmount.gt(market.userPrincipal) ? market.userPrincipal : safeAmount,
    ];
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const estimatedPrincipal = loanElasticToPrincipal({
      lastAccrued: market.lastAccrued,
      interestRate: market.interestRate,
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      userElastic: safeAmount,
      now: market.now,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    args = [account, safePrincipal];
  }

  if (market.kind === DineroMarketKind.Native) {
    const estimatedPrincipal = loanElasticToPrincipal({
      lastAccrued: market.lastAccrued,
      interestRate: market.interestRate,
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      userElastic: safeAmount,
      now: market.now,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    args = [account, safePrincipal];
  }

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

export const useRepay = (
  market: DineroMarketData,
  account: string,
  collateral: string,
  loan: string
) => {
  const [safeCollateral] = useDebounce(
    isNaN(+collateral) ? 0 : +collateral,
    500
  );
  const [safeLoan] = useDebounce(isNaN(+loan) ? 0 : +loan, 500);

  let data = {} as HandlerData;
  if (!!safeCollateral && !!safeLoan)
    data = handleRepayRequest(market, account, safeCollateral, safeLoan);

  if (safeCollateral && !safeLoan)
    data = handleRepayCollateral(market, account, safeCollateral);

  if (safeLoan && !safeCollateral)
    data = handleRepayLoan(market, account, safeLoan);

  const { config } = usePrepareContractWrite({
    addressOrName: market.marketAddress,
    ...data,
    enabled:
      data.enabled &&
      !isEmpty(data) &&
      isValidAccount(account) &&
      !isZeroAddress(market.marketAddress),
  });

  return useContractWrite(config);
};

const handleBorrowRequest = (
  market: DineroMarketData,
  account: string,
  collateral: number,
  loan: number
): HandlerData => {
  const collateralBN = safeToBigNumber(collateral, market.collateralDecimals);

  const safeCollateral = collateralBN.gt(market.collateralBalance)
    ? market.collateralBalance
    : collateralBN;

  const loanBN = safeToBigNumber(loan);

  const functionName = 'request';
  let args: any[] = [];
  let enabled = false;
  let overrides = {};
  let contractInterface: ContractInterface = '';

  if (market.kind === DineroMarketKind.ERC20) {
    args = [
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, safeCollateral), encodeData(account, loanBN)],
    ];
    enabled = !safeCollateral.isZero() || !loanBN.isZero();
    contractInterface = DineroERC20MarketABI;
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    args = [
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, safeCollateral), encodeData(account, loanBN)],
    ];
    enabled = !safeCollateral.isZero() || !loanBN.isZero();
    contractInterface = DineroLpFreeMarketABI;
  }

  if (market.kind === DineroMarketKind.Native) {
    const amountToSend = collateralBN.gte(
      market.collateralBalance.sub(
        safeToBigNumber(1, market.collateralDecimals - 1)
      )
    )
      ? market.collateralBalance
          .mul(ethers.utils.parseEther('0.95')) // gas
          .div(ethers.utils.parseEther('1'))
      : safeCollateral;

    args = [
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, amountToSend), encodeData(account, loanBN)],
    ];
    enabled = !amountToSend.isZero() || !loanBN.isZero();

    overrides = {
      value: amountToSend,
    };
    contractInterface = DineroNativeMarketABI;
  }

  return {
    functionName,
    args,
    contractInterface,
    overrides,
    enabled,
  };
};

const handleBorrowDeposit = (
  market: DineroMarketData,
  account: string,
  collateral: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeCollateral = bnCollateral.gt(market.collateralBalance)
    ? market.collateralBalance
    : bnCollateral;

  const functionName = 'deposit';
  let args: any[] = [];
  let enabled = false;
  let overrides = {};
  let contractInterface: ContractInterface = '';

  if (market.kind === DineroMarketKind.ERC20) {
    args = [account, safeCollateral];
    enabled = !safeCollateral.isZero();
    contractInterface = DineroERC20MarketABI;
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    args = [account, safeCollateral];
    enabled = !safeCollateral.isZero();
    contractInterface = DineroLpFreeMarketABI;
  }

  if (market.kind === DineroMarketKind.Native) {
    const amountToSend = bnCollateral.gte(
      market.collateralBalance.sub(
        safeToBigNumber(1, market.collateralDecimals - 1)
      )
    )
      ? market.collateralBalance
          .mul(ethers.utils.parseEther('0.95')) // gas
          .div(ethers.utils.parseEther('1'))
      : safeCollateral;

    args = [account];
    enabled = !amountToSend.isZero();
    contractInterface = DineroNativeMarketABI;
    overrides = {
      value: amountToSend,
    };
  }

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleBorrowLoan = (
  market: DineroMarketData,
  account: string,
  loan: number
): HandlerData => {
  const loanBN = safeToBigNumber(loan);

  const amountLeftToBorrow = market.maxBorrowAmount.sub(market.loanElastic);

  const functionName = 'borrow';
  let args: any[] = [];
  let enabled = false;
  const overrides = {};
  /**
   * @description The borrow interface should be the same for all contracts.
   */
  const contractInterface = DineroNativeMarketABI;

  if (market.kind === DineroMarketKind.ERC20) {
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow // room for interest rate
          .mul(ethers.utils.parseEther('0.98'))
          .div(ethers.utils.parseEther('1'))
      : loanBN;

    args = [account, safeLoanBN];
    enabled = !safeLoanBN.isZero();
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    /**
     * @description This market has no interest rate
     */
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow
      : loanBN;

    args = [account, safeLoanBN];
    enabled = !safeLoanBN.isZero();
  }

  if (market.kind === DineroMarketKind.Native) {
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow // room for interest rate
          .mul(ethers.utils.parseEther('0.98'))
          .div(ethers.utils.parseEther('1'))
      : loanBN;

    args = [account, safeLoanBN];
    enabled = !safeLoanBN.isZero();
  }

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

export const useBorrow = (
  market: DineroMarketData,
  account: string,
  collateral: string,
  loan: string
) => {
  const [safeCollateral] = useDebounce(
    isNaN(+collateral) ? 0 : +collateral,
    500
  );
  const [safeLoan] = useDebounce(isNaN(+loan) ? 0 : +loan, 500);

  let data = {} as HandlerData;
  if (!!safeCollateral && !!safeLoan)
    data = handleBorrowRequest(market, account, safeCollateral, safeLoan);

  if (safeCollateral && !safeLoan)
    data = handleBorrowDeposit(market, account, safeCollateral);

  if (safeLoan && !safeCollateral)
    data = handleBorrowLoan(market, account, safeLoan);

  const { config } = usePrepareContractWrite({
    addressOrName: market.marketAddress,
    ...data,
    enabled:
      data.enabled &&
      !isEmpty(data) &&
      isValidAccount(account) &&
      !isZeroAddress(market.marketAddress),
  });

  return useContractWrite(config);
};
