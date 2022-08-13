import { BigNumber, ethers } from 'ethers';

import { CHAIN_ID } from '@/sdk';
import {
  getETHERC20Address,
  getUSDCAddress,
  getUSDTAddress,
  getWETHAddress,
} from '@/utils';

/**
 * @desc The first item on pairs is to get the reserves to calculate Int Price. It needs to be added again for a specific pool.
 */
export const CASA_DE_PAPEL_FARM_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    // Only need to know the price of BTC
    baseTokens: [
      ethers.utils.getAddress(getWETHAddress(CHAIN_ID.BNB_TEST_NET)),
      ethers.utils.getAddress(getETHERC20Address(CHAIN_ID.BNB_TEST_NET)),
      ethers.utils.getAddress(getUSDCAddress(CHAIN_ID.BNB_TEST_NET)),
      ethers.utils.getAddress(getUSDTAddress(CHAIN_ID.BNB_TEST_NET)),
    ],
    poolIds: [0, 1, 2, 3, 4, 5],
    // [ BTC/INT no Pool id ,BTC/DNR poolId 1]
    pairs: [
      // INT Token
      ethers.utils.getAddress('0x0D7747F1686d67824dc5a299AAc09F438dD6aef2'),
      // WBNB/INT
      ethers.utils.getAddress('0xD4a22921a4A642AA653595f5530abd358F7f0842'),
      // WBNB/USDC
      ethers.utils.getAddress('0xb8AF44a4eD047F6137aC148b0D1197913222993d'),
      // ETH/INT
      ethers.utils.getAddress('0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0'),
      // USDC / DNR
      ethers.utils.getAddress('0xEAd84c099eb2ad7f9714AfE3Ee8939986c3D5691'),
      // USDT / DNR
      ethers.utils.getAddress('0x3Ffc3dc41961730544806d6127B621Fa1062f7A1'),
    ],
  },
};

export const CASA_DE_PAPEL_FARM_RESPONSE_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    makeBaseTokensPriceMap(x: ReadonlyArray<BigNumber>) {
      return CASA_DE_PAPEL_FARM_CALL_MAP[
        CHAIN_ID.BNB_TEST_NET
      ].baseTokens.reduce(
        (acc, value, index) => ({ ...acc, [value]: x[index] }),
        {} as { [key: string]: BigNumber }
      );
    },
    pools: [
      {
        token0: ethers.constants.AddressZero,
        token1: ethers.utils.getAddress(
          '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2'
        ),
        stable: false,
      },
      {
        token0: ethers.utils.getAddress(
          '0x0d7747f1686d67824dc5a299aac09f438dd6aef2'
        ),
        token1: ethers.utils.getAddress(
          '0x2f472b32b8041e51e53eec52e87c7060ea9c7ee8'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0xD4a22921a4A642AA653595f5530abd358F7f0842'
        ),
        stable: false,
      },
      {
        token0: ethers.utils.getAddress(
          '0x2f472b32b8041e51e53eec52e87c7060ea9c7ee8'
        ),
        token1: ethers.utils.getAddress(
          '0x80ae8dd1d0ca6fd6465b7fb8b9774573d7072d3c'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0xb8AF44a4eD047F6137aC148b0D1197913222993d'
        ),
        stable: false,
      },
      {
        token0: ethers.utils.getAddress(
          '0x0d7747f1686d67824dc5a299aac09f438dd6aef2'
        ),
        token1: ethers.utils.getAddress(
          '0x87e28b2242b0ab1f77360a1c3bb118fe662ae0c7'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0'
        ),
        stable: false,
      },
      {
        token0: ethers.utils.getAddress(
          '0x57486681d2e0bc9b0494446b8c5df35cd20d4e92'
        ),
        token1: ethers.utils.getAddress(
          '0xFe13cDD9D63D8FEa92d9C120D011653D9F6317f7'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0xEAd84c099eb2ad7f9714AfE3Ee8939986c3D5691'
        ),
        stable: true,
      },
      {
        token0: ethers.utils.getAddress(
          '0x57486681d2e0bc9b0494446b8c5df35cd20d4e92'
        ),
        token1: ethers.utils.getAddress(
          '0x80ae8dd1d0ca6fd6465b7fb8b9774573d7072d3c'
        ),
        stakingTokenAddress: ethers.utils.getAddress(
          '0x3Ffc3dc41961730544806d6127B621Fa1062f7A1'
        ),
        stable: true,
      },
    ],
  },
};

export const TOKEN_FARM_ID_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [ethers.utils.getAddress('0x0D7747F1686d67824dc5a299AAc09F438dD6aef2')]: 0,
    [ethers.utils.getAddress('0xD4a22921a4A642AA653595f5530abd358F7f0842')]: 1,
    [ethers.utils.getAddress('0xb8AF44a4eD047F6137aC148b0D1197913222993d')]: 2,
    [ethers.utils.getAddress('0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0')]: 3,
    [ethers.utils.getAddress('0xEAd84c099eb2ad7f9714AfE3Ee8939986c3D5691')]: 4,
    [ethers.utils.getAddress('0x3Ffc3dc41961730544806d6127B621Fa1062f7A1')]: 5,
  },
};
