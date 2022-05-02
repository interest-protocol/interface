import { BigNumber } from 'ethers';
import { ethers } from 'ethers';

import { ERC20 } from './erc-20';

const { getAddress } = ethers.utils;
import { ZERO_BIG_NUMBER } from '../utils';

interface IConstructor {
  stakingToken: ERC20;
  id: number;
  farmName: string;
  farmSymbol: string;
  token0: ERC20;
  token1: ERC20;
  reserve0: BigNumber;
  reserve1: BigNumber;
  allocationPoints: BigNumber;
  totalAllocationPoints: BigNumber;
}

interface IFromPancakeSwapArgs {
  stakingToken: IConstructor['stakingToken'];
  id: IConstructor['id'];
  farmName: IConstructor['farmName'];
  farmSymbol: IConstructor['farmSymbol'];
  token0: IConstructor['token0'];
  token1: IConstructor['token1'];
  reserve0: IConstructor['reserve0'];
  reserve1: IConstructor['reserve1'];
  allocationPoints: IConstructor['allocationPoints'];
  totalAllocationPoints: IConstructor['totalAllocationPoints'];
}

export class FarmV2 {
  public readonly stakingToken: ERC20;
  public readonly id: number;
  public readonly name: string;
  public readonly symbol: string;

  public readonly token0: ERC20;
  public readonly token1: ERC20;
  public readonly reserve0: BigNumber;
  public readonly reserve1: BigNumber;

  public readonly allocationPoints: BigNumber;
  public readonly totalAllocationPoints: BigNumber;

  protected constructor({
    allocationPoints,
    totalAllocationPoints,
    farmName,
    farmSymbol,
    id,
    token0,
    token1,
    reserve1,
    reserve0,
    stakingToken,
  }: IConstructor) {
    this.stakingToken = stakingToken;
    this.id = id;
    this.name = farmName;
    this.symbol = farmSymbol;
    this.token0 = token0;
    this.token1 = token1;
    this.reserve0 = reserve0;
    this.reserve1 = reserve1;
    this.allocationPoints = allocationPoints;
    this.totalAllocationPoints = totalAllocationPoints;
  }

  public static fromPancakeSwap(args: IFromPancakeSwapArgs): FarmV2 {
    return new FarmV2(args);
  }

  public quote1(amount0: BigNumber): BigNumber {
    if (this.reserve0.isZero()) return ZERO_BIG_NUMBER;
    return amount0.mul(this.reserve1).div(this.reserve0);
  }

  public quote0(amount1: BigNumber): BigNumber {
    if (this.reserve0.isZero()) return ZERO_BIG_NUMBER;
    return amount1.mul(this.reserve0).div(this.reserve1);
  }

  public getTokenReserve(address: string): BigNumber {
    if (getAddress(address) === getAddress(this.token0.address))
      return this.reserve0;

    if (getAddress(address) === getAddress(this.token1.address))
      return this.reserve1;

    return BigNumber.from(0);
  }
}
