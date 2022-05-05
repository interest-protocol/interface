import { BigNumber } from 'ethers';

import { ERC20 } from '@/sdk/entities/erc-20';

import { TOKEN_SYMBOL } from '../constants';
import { LPPairV2 } from './lp-pair';

interface IConstructor<T> {
  stakingToken: T;
  id: number;
  allocationPoints: BigNumber;
  totalAllocationPoints: BigNumber;
  farmName: string;
  farmSymbol: string;
  totalStakedAmount: BigNumber;
  isPool: boolean;
}

interface createPCS {
  address: string;
  chainId: number;
  token0: ERC20;
  token1: ERC20;
  reserves0: BigNumber;
  reserves1: BigNumber;
  id: IConstructor<unknown>['id'];
  allocationPoints: IConstructor<unknown>['allocationPoints'];
  totalAllocationPoints: IConstructor<unknown>['totalAllocationPoints'];
  totalStakedAmount: BigNumber;
}

interface CreateIntPool {
  int: ERC20;
  allocationPoints: IConstructor<unknown>['allocationPoints'];
  totalAllocationPoints: IConstructor<unknown>['totalAllocationPoints'];
  totalStakedAmount: BigNumber;
}

export class FarmV2<T> {
  public readonly stakingToken: T;
  public readonly id: number;
  public readonly farmName: string;
  public readonly farmSymbol: string;

  public readonly allocationPoints: BigNumber;
  public readonly totalAllocationPoints: BigNumber;
  public readonly totalStakedAmount: BigNumber;
  public readonly isPool: boolean;

  protected constructor({
    allocationPoints,
    totalAllocationPoints,
    id,
    stakingToken,
    farmName,
    farmSymbol,
    totalStakedAmount,
    isPool,
  }: IConstructor<T>) {
    this.id = id;
    this.stakingToken = stakingToken;
    this.allocationPoints = allocationPoints;
    this.totalAllocationPoints = totalAllocationPoints;
    this.farmSymbol = farmSymbol;
    this.farmName = farmName;
    this.totalStakedAmount = totalStakedAmount;
    this.isPool = isPool;
  }

  public static createIntPool({
    int,
    allocationPoints,
    totalAllocationPoints,
    totalStakedAmount,
  }: CreateIntPool): FarmV2<ERC20> {
    return new FarmV2({
      allocationPoints,
      totalAllocationPoints,
      id: 0,
      farmSymbol: 'Int',
      farmName: 'Interest Token',
      stakingToken: int,
      totalStakedAmount,
      isPool: true,
    });
  }

  public static createPCSPairFarmV2({
    token0,
    token1,
    id,
    allocationPoints,
    totalAllocationPoints,
    chainId,
    reserves0,
    reserves1,
    address,
    totalStakedAmount,
  }: createPCS): FarmV2<LPPairV2> {
    const stakingToken = LPPairV2.createPCSPair(
      address,
      chainId,
      token0,
      token1,
      reserves0,
      reserves1
    );

    const isToken1 = stakingToken.token1.symbol === TOKEN_SYMBOL.WBNB;

    const farmName = isToken1
      ? `${stakingToken.token1.name} | ${stakingToken.token0.name}`
      : `${stakingToken.token0.name} | ${stakingToken.token1.name}`;

    const farmSymbol = isToken1
      ? `${stakingToken.token1.symbol}/${stakingToken.token0.symbol}`
      : `${stakingToken.token0.symbol}/${stakingToken.token1.symbol}`;

    return new FarmV2({
      allocationPoints,
      totalAllocationPoints,
      id,
      farmSymbol,
      farmName,
      totalStakedAmount,
      isPool: false,
      stakingToken: LPPairV2.createPCSPair(
        address,
        chainId,
        token0,
        token1,
        reserves0,
        reserves1
      ),
    });
  }

  // Getters to convert to a specific type

  public getFarm(): FarmV2<LPPairV2> | null {
    return this.isPool ? null : (this as unknown as FarmV2<LPPairV2>);
  }

  public getPool(): FarmV2<ERC20> | null {
    return this.isPool ? (this as unknown as FarmV2<ERC20>) : null;
  }

  public getRewardTokenMetaData() {
    return {
      name: 'Interest Token',
      decimals: 18,
      symbol: 'Int',
    };
  }
}
