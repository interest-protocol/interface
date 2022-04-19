import { ethers } from 'ethers';

import CasaDePapelABI from '@/constants/abi/casa-de-papel.abi.json';
import { CHAIN_ID } from '@/constants/chains';
import { CASA_DE_PAPEL } from '@/constants/contracts';
import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20';
import { BLOCKS_PER_YEAR } from '@/constants/index';
import { IntMath } from '@/sdk/entities/int-math';
import { formatDollars } from '@/utils';

import { CasaDePapelAbi } from '../../types/ethers-contracts';
import {
  TCalculateAllocation,
  TCalculateFarmBaseAPR,
  TCalculateFarmTokenPrice,
  TCalculateTVL,
  TGetCasaDePapelMintData,
  TGetPoolData,
  TGetRewards,
  TGetUserPoolData,
  TManageLP,
} from './casa-de-papel.types';

export const getPoolData: TGetPoolData = async (provider, id) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider
  ) as CasaDePapelAbi;

  const [stakingToken, allocationPoints, , , totalSupply] =
    await casaDePapel.pools(id);

  return { stakingToken, allocationPoints, totalSupply };
};

export const depositLP: TManageLP = (provider, account, id, amount) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider.getSigner(account)
  ) as CasaDePapelAbi;

  if (id === 0) return casaDePapel.stake(amount);

  return casaDePapel.deposit(0, amount);
};

export const withdrawLP: TManageLP = (provider, account, id, amount) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider.getSigner(account)
  ) as CasaDePapelAbi;

  if (id === 0) return casaDePapel.unstake(account, account, amount);

  return casaDePapel.withdraw(0, amount);
};

export const getRewards: TGetRewards = (provider, account, id) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider.getSigner(account)
  ) as CasaDePapelAbi;

  if (id === 0) return casaDePapel.stake(0);

  return casaDePapel.deposit(id, 0);
};

export const getCasaDePapelMintData: TGetCasaDePapelMintData = async (
  provider
) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider
  ) as CasaDePapelAbi;

  const [totalAllocationPoints, interestTokenPerBlock] = await Promise.all([
    casaDePapel.totalAllocationPoints(),
    casaDePapel.interestTokenPerBlock(),
  ]);

  return {
    totalAllocationPoints,
    interestTokenPerBlock,
  };
};

export const getUserPoolData: TGetUserPoolData = async (
  provider,
  account,
  id
) => {
  const casaDePapel = new ethers.Contract(
    CASA_DE_PAPEL,
    CasaDePapelABI,
    provider
  ) as CasaDePapelAbi;

  const [[stakingAmount], pendingRewards] = await Promise.all([
    casaDePapel.userInfo(id, account),
    casaDePapel.pendingRewards(id, account),
  ]);

  return {
    stakingAmount,
    pendingRewards,
  };
};

export const calculateTVL: TCalculateTVL = (
  basePrice,
  baseTokenAddress,
  farm
) => {
  if (basePrice.isZero()) return formatDollars(0);

  const reserve = farm.getTokenReserve(baseTokenAddress);
  const tvl = IntMath.from(basePrice).mul(reserve).value().mul(2);
  return formatDollars(IntMath.toNumber(tvl));
};

export const calculateAllocation: TCalculateAllocation = (farm) => {
  if (farm.allocationPoints.isZero() || farm.totalAllocationPoints.isZero())
    return '0%';

  return `${farm.allocationPoints.mul(100).div(farm.totalAllocationPoints)}%`;
};

export const calculateFarmBaseAPR: TCalculateFarmBaseAPR = (
  intPerBlock,
  basePrice,
  baseTokenAddress,
  farm
) => {
  if (farm.totalAllocationPoints.isZero() || farm.allocationPoints.isZero())
    return '0%';

  const farmRewardsAllocationPerYear = intPerBlock
    .mul(BLOCKS_PER_YEAR[CHAIN_ID.BSC_TEST_NET])
    .mul(farm.allocationPoints)
    .div(farm.totalAllocationPoints);

  if (
    ethers.utils.getAddress(farm.token0.address) ===
    ethers.utils.getAddress(baseTokenAddress)
  ) {
    // 1 BTC -> X Int
    const intUSDPrice = IntMath.from(basePrice).div(
      farm.quote1(ethers.utils.parseEther('1'))
    );

    const reserveInUSD = IntMath.from(basePrice)
      .mul(farm.reserve0)
      .value()
      .mul(2);

    return IntMath.from(
      farmRewardsAllocationPerYear.mul(intUSDPrice.value()).div(reserveInUSD)
    ).toPercentage();
  }

  // 1 BTC -> X Int
  const intUSDPrice = IntMath.from(basePrice).div(
    farm.quote0(ethers.utils.parseEther('1'))
  );

  const reserveInUSD = IntMath.from(basePrice)
    .mul(farm.reserve1)
    .value()
    .mul(2);

  return IntMath.from(
    farmRewardsAllocationPerYear.mul(intUSDPrice.value()).div(reserveInUSD)
  ).toPercentage();
};

export const calculateFarmTokenPrice: TCalculateFarmTokenPrice = (
  basePrice,
  farm,
  totalSupply
) => {
  // Int Token is Id 0
  const isToken0 =
    ethers.utils.getAddress(farm.token0.address) ===
    ethers.utils.getAddress(BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address);

  if (farm.id === 0) {
    const amount = isToken0
      ? farm.quote1(ethers.utils.parseEther('1'))
      : farm.quote0(ethers.utils.parseEther('1'));

    return IntMath.from(basePrice).div(amount);
  }

  // LP Token  logic

  const reserve = isToken0 ? farm.reserve0 : farm.reserve1;

  const reserveInUSD = IntMath.from(reserve.mul(2)).mul(basePrice);

  return reserveInUSD.div(totalSupply);
};
