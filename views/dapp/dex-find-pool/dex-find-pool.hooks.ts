import { CallOverrides } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { pathOr } from 'ramda';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { sortTokens, ZERO_BIG_NUMBER } from '@/sdk';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import {
  getInterestDexRouterAddress,
  isSameAddressZ,
  isZeroAddress,
  stringToBigNumber,
} from '@/utils';

import { UseAddNativeTokenLiquidityArgs } from './dex-find-pool.types';

export const useAddLiquidity = ({
  control,
  balancesData,
  nativeBalance,
  isStable,
  account,
  chainId,
}: UseAddNativeTokenLiquidityArgs) => {
  const tokenA = useWatch({ control, name: 'tokenA' });
  const tokenB = useWatch({ control, name: 'tokenB' });

  const [token0Address] = sortTokens(tokenA.address, tokenB.address);

  const token0 = isSameAddressZ(token0Address, tokenA.address)
    ? tokenA
    : tokenB;

  const token1 = isSameAddressZ(token0Address, tokenA.address)
    ? tokenB
    : tokenA;

  const amount0 = stringToBigNumber(token0.value, token0.decimals);

  const amount1 = stringToBigNumber(token1.value, token1.decimals);

  const token1UserBalance = pathOr(
    ZERO_BIG_NUMBER,
    [getAddress(token1.address), 'balance'],
    balancesData
  );

  const token0UserBalance = pathOr(
    ZERO_BIG_NUMBER,
    [getAddress(token0.address), 'balance'],
    balancesData
  );

  const safeAmount0 = amount0.gt(token0UserBalance)
    ? token0UserBalance
    : amount0;

  const safeAmount1 = amount1.gt(token1UserBalance)
    ? token1UserBalance
    : amount1;

  // 5 minutes
  const [deadline] = useDebounce(
    Math.ceil((Date.now() + 5 * 60 * 1000) / 1000),
    10000
  );

  const safeAmount0Native = amount0.gt(nativeBalance) ? nativeBalance : amount0;

  const [debouncedAmount0] = useDebounce(safeAmount0, 500, {
    equalityFn: (x, y) => x.eq(y),
  });
  const [debouncedAmount1] = useDebounce(safeAmount1, 500, {
    equalityFn: (x, y) => x.eq(y),
  });
  const [debouncedSafeAmount0Native] = useDebounce(safeAmount0Native, 500, {
    equalityFn: (x, y) => x.eq(y),
  });

  let args: Array<any> = [];
  let functionName = '';
  let overrides: CallOverrides = {};
  let enabled = false;

  if (isZeroAddress(token0.address)) {
    args = [
      token1.address,
      isStable,
      debouncedAmount1,
      debouncedAmount1,
      debouncedSafeAmount0Native,
      account,
      deadline,
    ];
    overrides = { value: debouncedSafeAmount0Native };
    functionName = 'addLiquidityNativeToken';
    enabled =
      !debouncedSafeAmount0Native.isZero() && !debouncedAmount1.isZero();
  } else {
    args = [
      token0.address,
      token1.address,
      isStable,
      safeAmount0,
      safeAmount1,
      safeAmount0,
      safeAmount1,
      account,
      deadline,
    ];
    overrides = {};
    functionName = 'addLiquidity';
    enabled = !debouncedAmount0.isZero() && !debouncedAmount1.isZero();
  }

  const { config } = usePrepareContractWrite({
    addressOrName: getInterestDexRouterAddress(chainId),
    contractInterface: InterestDexRouterABI,
    chainId,
    functionName,
    args,
    overrides,
    enabled,
  });

  return useContractWrite(config);
};
