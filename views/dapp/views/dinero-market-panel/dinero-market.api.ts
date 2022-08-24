import { JsonRpcSigner } from '@ethersproject/providers';
import { ethers } from 'ethers';

import {
  erc20MarketRepay,
  erc20MarketRequest,
  erc20MarketWithdraw,
  lpFreeMarketRepay,
  lpFreeMarketRequest,
  lpFreeMarketWithdraw,
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
    const tx = await lpFreeMarketRepay(
      signer,
      market.marketAddress,
      account,
      safeBNCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.ERC20) {
    const tx = await erc20MarketRepay(
      signer,
      market.marketAddress,
      account,
      safeBNCollateral
    );

    return showTXSuccessToast(tx, chainId);
  }

  if (market.kind === DineroMarketKind.Native) {
    const tx = await nativeMarketRepay(
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
    const safePrincipal = loanBN.gt(market.loanBase)
      ? market.loanElastic
      : loanBN;

    const tx = await lpFreeMarketWithdraw(
      signer,
      market.marketAddress,
      account,
      safePrincipal
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

    const tx = await erc20MarketWithdraw(
      signer,
      market.marketAddress,
      account,
      safePrincipal
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

    const tx = await nativeMarketWithdraw(
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
