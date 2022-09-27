import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { ethers } from 'ethers';

import { CHAINS, WRAPPED_NATIVE_TOKEN } from '@/constants';
import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import {
  isSameAddressZ,
  replaceWrappedNativeTokenAddressWithZero,
} from '@/utils';

import {
  ERC20MetadataStructOutput,
  PairMetadataStructOutput,
} from '../../../../types/ethers-contracts/InterestViewDexAbi';

const processMetadata = (
  chainId: number,
  token: string,
  metadata: ERC20MetadataStructOutput
) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];
  const nativeToken = CHAINS[chainId].nativeCurrency!;

  return isSameAddressZ(wrappedNativeToken.address, token)
    ? {
        ...nativeToken,
        decimals: BigNumber.from(nativeToken?.decimals).toNumber(),
      }
    : {
        ...metadata,
        decimals: metadata.decimals.toNumber(),
      };
};

const processAllowance = (
  chainId: number,
  token: string,
  allowance: BigNumber
) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];

  return isSameAddressZ(wrappedNativeToken.address, token)
    ? ethers.constants.MaxUint256
    : allowance;
};

const processBalance = (
  chainId: number,
  token: string,
  nativeBalance: string,
  balance: BigNumber
) => {
  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];

  return isSameAddressZ(wrappedNativeToken.address, token)
    ? BigNumber.from(nativeBalance)
    : balance;
};

export const processPairData = (
  chainId: number,
  data:
    | ([PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
        pairMetadata: PairMetadataStructOutput;
        allowances: BigNumber[];
        balances: BigNumber[];
      })
    | undefined
    | Result,
  nativeBalance: string
) => {
  const defaultERC20Metadata = {
    name: '???',
    symbol: '???',
    decimals: 18,
  };

  const defaultData = {
    token0Metadata: defaultERC20Metadata,
    token1Metadata: defaultERC20Metadata,
    token0: ZERO_ADDRESS,
    token1: ZERO_ADDRESS,
    isStable: false,
    reserve0: ZERO_BIG_NUMBER,
    reserve1: ZERO_BIG_NUMBER,
    lpAllowance: ZERO_BIG_NUMBER,
    lpBalance: ZERO_BIG_NUMBER,
    token0Balance: ZERO_BIG_NUMBER,
    token0Allowance: ZERO_BIG_NUMBER,
    token1Balance: ZERO_BIG_NUMBER,
    token1Allowance: ZERO_BIG_NUMBER,
  };

  if (!data) return { ...defaultData, pairExists: true, loading: true };

  if (data.allowances.length === 0)
    return { ...defaultData, pairExists: false, loading: false };

  return {
    token0Metadata: processMetadata(
      chainId,
      data.pairMetadata.token0,
      data.pairMetadata.token0Metadata
    ),
    token1Metadata: processMetadata(
      chainId,
      data.pairMetadata.token1,
      data.pairMetadata.token1Metadata
    ),
    token0: replaceWrappedNativeTokenAddressWithZero(
      chainId,
      data.pairMetadata.token0
    ),
    token1: replaceWrappedNativeTokenAddressWithZero(
      chainId,
      data.pairMetadata.token1
    ),
    isStable: data.pairMetadata.isStable,
    reserve0: data.pairMetadata.reserve0,
    reserve1: data.pairMetadata.reserve1,
    lpAllowance: data.allowances[0],
    lpBalance: data.balances[0],
    token0Balance: processBalance(
      chainId,
      data.pairMetadata.token0,
      nativeBalance,
      data.balances[1]
    ),
    token0Allowance: processAllowance(
      chainId,
      data.pairMetadata.token0,
      data.allowances[1]
    ),
    token1Balance: processBalance(
      chainId,
      data.pairMetadata.token1,
      nativeBalance,
      data.balances[2]
    ),
    token1Allowance: processAllowance(
      chainId,
      data.pairMetadata.token1,
      data.allowances[2]
    ),
    pairExists: true,
    loading: false,
  };
};
