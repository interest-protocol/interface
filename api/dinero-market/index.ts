import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';

import {
  getDineroERC20Market,
  getDineroLPFreeMarket,
  getDineroNativeMarket,
} from '@/utils/contracts';

export const erc20MarketDeposit = (
  signer: JsonRpcSigner,
  marketAddress: string,
  userAccount: string,
  amount: BigNumber
) => getDineroERC20Market(signer, marketAddress).deposit(userAccount, amount);

export const erc20MarketWithdraw = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroERC20Market(signer, marketAddress).withdraw(to, amount);

export const erc20MarketRepay = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  principal: BigNumber
) => getDineroERC20Market(signer, marketAddress).repay(to, principal);

export const erc20MarketBorrow = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroERC20Market(signer, marketAddress).borrow(to, amount);

export const erc20MarketRequest = (
  signer: JsonRpcSigner,
  marketAddress: string,
  actions: Array<BigNumberish>,
  dataArray: Array<BytesLike>
) => getDineroERC20Market(signer, marketAddress).request(actions, dataArray);

export const nativeMarketDeposit = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) =>
  getDineroNativeMarket(signer, marketAddress).deposit(to, { value: amount });

export const nativeMarketWithdraw = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroNativeMarket(signer, marketAddress).withdraw(to, amount);

export const nativeMarketRepay = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  principal: BigNumber
) => getDineroNativeMarket(signer, marketAddress).repay(to, principal);

export const nativeMarketBorrow = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroNativeMarket(signer, marketAddress).borrow(to, amount);

export const nativeMarketRequest = (
  signer: JsonRpcSigner,
  marketAddress: string,
  value: BigNumber,
  actions: Array<BigNumberish>,
  dataArray: Array<BytesLike>
) =>
  getDineroNativeMarket(signer, marketAddress).request(actions, dataArray, {
    value,
  });

export const lpFreeMarketDeposit = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroLPFreeMarket(signer, marketAddress).deposit(to, amount);

export const lpFreeMarketWithdraw = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroLPFreeMarket(signer, marketAddress).withdraw(to, amount);

export const lpFreeMarketRepay = (
  signer: JsonRpcSigner,
  marketAddress: string,
  account: string,
  principal: BigNumber
) => getDineroLPFreeMarket(signer, marketAddress).repay(account, principal);

export const lpFreeMarketBorrow = (
  signer: JsonRpcSigner,
  marketAddress: string,
  to: string,
  amount: BigNumber
) => getDineroLPFreeMarket(signer, marketAddress).borrow(to, amount);

export const lpFreeMarketRequest = (
  signer: JsonRpcSigner,
  marketAddress: string,
  actions: Array<BigNumberish>,
  dataArray: Array<BytesLike>
) => getDineroLPFreeMarket(signer, marketAddress).request(actions, dataArray);
