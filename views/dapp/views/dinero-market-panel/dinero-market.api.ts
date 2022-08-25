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
import { IntMath } from '@/sdk';
import { safeToBigNumber, showTXSuccessToast } from '@/utils';
import { DineroMarketData } from '@/views/dapp/views/dinero-market-panel/dinero-market.types';
import { loanElasticToPrincipal } from '@/views/dapp/views/dinero-market-panel/dinero-market.utils';

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
    const loanBN = IntMath.toBigNumber(loan);
    const safePrincipal = loanBN.gt(market.loanBase)
      ? market.loanElastic
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
    const estimatedPrincipal = loanElasticToPrincipal(
      safeToBigNumber(loan, 18, 8),
      market.lastAccrued,
      market.loanElastic,
      market.interestRate
    ).value();

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
    const estimatedPrincipal = loanElasticToPrincipal(
      safeToBigNumber(loan, 18, 8),
      market.lastAccrued,
      market.loanElastic,
      market.interestRate
    ).value();

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
  if (market.kind === DineroMarketKind.LpFreeMarket) {
    const loanBN = IntMath.toBigNumber(loan);
    const safeAmount = loanBN.gt(market.dnrBalance)
      ? market.dnrBalance
      : loanBN;

    const tx = await lpFreeMarketRepay(
      signer,
      market.marketAddress,
      account,
      safeAmount.gt(market.userPrincipal) ? market.userPrincipal : safeAmount
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const estimatedPrincipal = loanElasticToPrincipal(
      safeToBigNumber(loan, 18, 8),
      market.lastAccrued,
      market.loanElastic,
      market.interestRate
    ).value();

    const safeAmount = estimatedPrincipal.gt(market.dnrBalance)
      ? market.dnrBalance
      : estimatedPrincipal;

    const tx = await erc20MarketRepay(
      signer,
      market.marketAddress,
      account,
      safeAmount.gt(market.userPrincipal) ? market.userPrincipal : safeAmount
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const estimatedPrincipal = loanElasticToPrincipal(
      safeToBigNumber(loan, 18, 8),
      market.lastAccrued,
      market.loanElastic,
      market.interestRate
    ).value();

    const safeAmount = estimatedPrincipal.gt(market.dnrBalance)
      ? market.userPrincipal
      : estimatedPrincipal;

    const tx = await nativeMarketRepay(
      signer,
      market.marketAddress,
      account,
      safeAmount.gt(market.userPrincipal) ? market.userPrincipal : safeAmount
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
    const tx = await nativeMarketRequest(
      signer,
      market.marketAddress,
      safeCollateral,
      [RequestActions.Deposit, RequestActions.Borrow],
      [encodeData(account, safeCollateral), encodeData(account, loanBN)]
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

  const safeCollateral = bnCollateral.gt(market.userCollateral)
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
    const tx = await nativeMarketDeposit(
      signer,
      market.marketAddress,
      account,
      safeCollateral
        .mul(ethers.utils.parseEther('0.95')) // gas
        .div(ethers.utils.parseEther('1'))
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
    const safeLoanBN = loanBN.gt(amountLeftToBorrow)
      ? amountLeftToBorrow // die to interest rate
          .mul(ethers.utils.parseEther('0.95'))
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
    const safeLoanBN = loanBN.gt(amountLeftToBorrow)
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
    const safeLoanBN = loanBN.gt(amountLeftToBorrow)
      ? amountLeftToBorrow // die to interest rate
          .mul(ethers.utils.parseEther('0.95'))
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
