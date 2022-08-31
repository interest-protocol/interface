import { JsonRpcSigner } from '@ethersproject/providers';
import { ethers } from 'ethers';

import {
  erc20MarketBorrow,
  erc20MarketDeposit,
  erc20MarketRepay,
  erc20MarketRequest,
  erc20MarketWithdraw,
  lpFreeMarketBorrow,
  lpFreeMarketDeposit,
  lpFreeMarketRepay,
  lpFreeMarketRequest,
  lpFreeMarketWithdraw,
  nativeMarketBorrow,
  nativeMarketDeposit,
  nativeMarketRepay,
  nativeMarketRequest,
  nativeMarketWithdraw,
} from '@/api';
import { DineroMarketKind } from '@/constants';
import { FixedPointMath } from '@/sdk';
import { safeToBigNumber, showTXSuccessToast } from '@/utils';

import { DineroMarketData } from './dinero-market.types';
import { loanElasticToPrincipal } from './dinero-market.utils';

const { defaultAbiCoder } = ethers.utils;

const encodeData = (to: string, amount: ethers.BigNumber) =>
  defaultAbiCoder.encode(['address', 'uint256'], [to, amount]);

enum RequestActions {
  Deposit,
  Withdraw,
  Borrow,
  Repay,
}

const handleRepayRequest = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number,
  loan: number
) => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  /**
   * @description We do not need to calculate the elastic loan, because this market does not have any interest rate.
   */
  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const loanBN = FixedPointMath.toBigNumber(loan);
    const safePrincipal = loanBN.gt(market.userPrincipal)
      ? market.userPrincipal
      : loanBN;

    const tx = await lpFreeMarketRequest(
      signer,
      market.marketAddress,
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ]
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const estimatedPrincipal = loanElasticToPrincipal({
      interestRate: market.interestRate,
      lastAccrued: market.lastAccrued,
      loanElastic: market.loanElastic,
      loanBase: market.loanBase,
      userElastic: safeToBigNumber(loan, 18, 8),
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    const tx = await erc20MarketRequest(
      signer,
      market.marketAddress,
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ]
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const estimatedPrincipal = loanElasticToPrincipal({
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      interestRate: market.interestRate,
      lastAccrued: market.lastAccrued,
      userElastic: safeToBigNumber(loan, 18, 8),
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    const tx = await nativeMarketRequest(
      signer,
      market.marketAddress,
      ethers.BigNumber.from(0),
      [RequestActions.Repay, RequestActions.Withdraw],
      [
        encodeData(account, safePrincipal),
        encodeData(account, safeBNCollateral),
      ]
    );

    return showTXSuccessToast(tx, chainId);
  }
};

const handleRepayCollateral = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number
) => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const tx = await lpFreeMarketWithdraw(
      signer,
      market.marketAddress,
      account,
      safeBNCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const tx = await erc20MarketWithdraw(
      signer,
      market.marketAddress,
      account,
      safeBNCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const tx = await nativeMarketWithdraw(
      signer,
      market.marketAddress,
      account,
      safeBNCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }
};

const handleRepayLoan = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  loan: number
) => {
  const loanBN = FixedPointMath.toBigNumber(loan);
  const safeAmount = loanBN.gt(market.dnrBalance) ? market.dnrBalance : loanBN;

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const tx = await lpFreeMarketRepay(
      signer,
      market.marketAddress,
      account,
      safeAmount.gt(market.userPrincipal) ? market.userPrincipal : safeAmount
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const estimatedPrincipal = loanElasticToPrincipal({
      lastAccrued: market.lastAccrued,
      interestRate: market.interestRate,
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      userElastic: safeAmount,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    const tx = await erc20MarketRepay(
      signer,
      market.marketAddress,
      account,
      safePrincipal
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const estimatedPrincipal = loanElasticToPrincipal({
      lastAccrued: market.lastAccrued,
      interestRate: market.interestRate,
      loanBase: market.loanBase,
      loanElastic: market.loanElastic,
      userElastic: safeAmount,
    }).value();

    const safePrincipal = estimatedPrincipal.gt(market.userPrincipal)
      ? market.userPrincipal
      : estimatedPrincipal;

    const tx = await nativeMarketRepay(
      signer,
      market.marketAddress,
      account,
      safePrincipal
    );

    return showTXSuccessToast(tx, chainId);
  }
};

export const handleRepay = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number | undefined,
  loan: number | undefined
) => {
  if (!!collateral && !!loan)
    return handleRepayRequest(
      chainId,
      signer,
      market,
      account,
      collateral,
      loan
    );

  if (collateral)
    return handleRepayCollateral(chainId, signer, market, account, collateral);

  if (loan) return handleRepayLoan(chainId, signer, market, account, loan);
};

const handleBorrowRequest = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number,
  loan: number
) => {
  const collateralBN = safeToBigNumber(collateral, market.collateralDecimals);

  const safeCollateral = collateralBN.gt(market.collateralBalance)
    ? market.collateralBalance
    : collateralBN;

  const loanBN = safeToBigNumber(loan);

  if (market.kind === DineroMarketKind.ERC20) {
    const tx = await erc20MarketRequest(
      signer,
      market.marketAddress,
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, safeCollateral), encodeData(account, loanBN)]
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const tx = await lpFreeMarketRequest(
      signer,
      market.marketAddress,
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, safeCollateral), encodeData(account, loanBN)]
    );

    return showTXSuccessToast(tx, chainId);
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

    const tx = await nativeMarketRequest(
      signer,
      market.marketAddress,
      amountToSend,
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, amountToSend), encodeData(account, loanBN)]
    );

    return showTXSuccessToast(tx, chainId);
  }
};

const handleBorrowDeposit = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number
) => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeCollateral = bnCollateral.gt(market.collateralBalance)
    ? market.collateralBalance
    : bnCollateral;

  if (market.kind === DineroMarketKind.ERC20) {
    const tx = await erc20MarketDeposit(
      signer,
      market.marketAddress,
      account,
      safeCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const tx = await lpFreeMarketDeposit(
      signer,
      market.marketAddress,
      account,
      safeCollateral
    );

    return showTXSuccessToast(tx, chainId);
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

    const tx = await nativeMarketDeposit(
      signer,
      market.marketAddress,
      account,
      amountToSend
    );

    return showTXSuccessToast(tx, chainId);
  }
};

const handleBorrowLoan = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  loan: number
) => {
  const loanBN = safeToBigNumber(loan);

  const amountLeftToBorrow = market.maxBorrowAmount.sub(market.loanElastic);

  if (market.kind === DineroMarketKind.ERC20) {
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow // room for interest rate
          .mul(ethers.utils.parseEther('0.98'))
          .div(ethers.utils.parseEther('1'))
      : loanBN;

    const tx = await erc20MarketBorrow(
      signer,
      market.marketAddress,
      account,
      safeLoanBN
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.LpFreeMarket) {
    /**
     * @description This market has no interest rate
     */
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow
      : loanBN;
    const tx = await lpFreeMarketBorrow(
      signer,
      market.marketAddress,
      account,
      safeLoanBN
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const safeLoanBN = loanBN.gte(amountLeftToBorrow)
      ? amountLeftToBorrow // room for interest rate
          .mul(ethers.utils.parseEther('0.98'))
          .div(ethers.utils.parseEther('1'))
      : loanBN;

    const tx = await nativeMarketBorrow(
      signer,
      market.marketAddress,
      account,
      safeLoanBN
    );

    return showTXSuccessToast(tx, chainId);
  }
};

export const handleBorrow = async (
  chainId: number,
  signer: JsonRpcSigner,
  market: DineroMarketData,
  account: string,
  collateral: number | undefined,
  loan: number | undefined
) => {
  if (!!collateral && !!loan)
    return handleBorrowRequest(
      chainId,
      signer,
      market,
      account,
      collateral,
      loan
    );

  if (collateral)
    return handleBorrowDeposit(chainId, signer, market, account, collateral);

  if (loan) return handleBorrowLoan(chainId, signer, market, account, loan);
};
