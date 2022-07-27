import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

import { RouteStruct } from '../../types/ethers-contracts/InterestDexRouterAbi';

export type Swap = (
  chainId: number,
  signer: JsonRpcSigner,
  amountIn: BigNumberish,
  amountOutMin: BigNumberish,
  routes: RouteStruct[],
  to: string,
  deadline: number
) => Promise<ContractTransaction>;

export type QuoteRemoveLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  amount: BigNumber
) => Promise<
  [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
>;

export type QuoteAddLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  amountADesired: BigNumber,
  amountBDesired: BigNumber
) => Promise<
  [BigNumber, BigNumber, BigNumber] & {
    amountA: BigNumber;
    amountB: BigNumber;
    liquidity: BigNumber;
  }
>;

export type RemoveLiquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  liquidity: BigNumber,
  minAmountA: BigNumber,
  minAmountB: BigNumber,
  to: string,
  deadline: number
) => Promise<ContractTransaction>;

export type AddERC20Liquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  amountADesired: BigNumber,
  amountBDesired: BigNumber,
  amountAMin: BigNumber,
  amountBMin: BigNumber,
  to: string,
  deadline: number
) => Promise<ContractTransaction>;

export type AddNativeTokenLiquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  nativeAmount: BigNumber,
  token: string,
  isStable: boolean,
  amountTokenDesired: BigNumber,
  amountTokenMin: BigNumber,
  amountNativeTokenMin: BigNumber,
  to: string,
  deadline: number
) => Promise<ContractTransaction>;
