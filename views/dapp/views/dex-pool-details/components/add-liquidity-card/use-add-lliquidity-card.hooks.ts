import { useWatch } from 'react-hook-form';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { ZERO_ADDRESS } from '@/sdk';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import {
  getBNPercent,
  getInterestDexRouterAddress,
  isSameAddressZ,
  stringToBigNumber,
} from '@/utils';

const get90Percent = getBNPercent(90);

import { CallOverrides } from 'ethers';

import { useDebounce } from '@/hooks';

import { UseAddLiquidityArgs } from './add-liquidity-card.types';

export const useAddLiquidity = ({
  tokens,
  control,
  chainId,
  isStable,
  account,
}: UseAddLiquidityArgs) => {
  const token0Amount = useWatch({ control, name: 'token0Amount' });
  const token1Amount = useWatch({ control, name: 'token1Amount' });

  const [token0, token1] = tokens;

  const amount0 = stringToBigNumber(token0Amount, token0.decimals);

  const amount1 = stringToBigNumber(token1Amount, token1.decimals);

  // 5 minutes
  const deadline = Math.ceil((new Date().getTime() + 5 * 60 * 1000) / 1000);

  const safeAmount0 = useDebounce(
    amount0.gt(token0.balance) ? token0.balance : amount0,
    500
  );
  const safeAmount1 = useDebounce(
    amount1.gt(token1.balance) ? token1.balance : amount1,
    500
  );

  let functionName = 'addLiquidity';
  let args = [
    token0.address,
    token1.address,
    isStable,
    safeAmount0,
    safeAmount1,
    get90Percent(safeAmount0, token1.decimals),
    get90Percent(safeAmount1, token1.decimals),
    account,
    deadline,
  ];
  let overrides: CallOverrides = {};
  const enabled =
    !tokens[0].allowance.isZero() &&
    !tokens[1].allowance.isZero() &&
    !safeAmount0.isZero() &&
    !safeAmount1.isZero();

  // token0 is Native
  if (isSameAddressZ(token0.address, ZERO_ADDRESS)) {
    functionName = 'addLiquidityNativeToken';
    overrides = { value: safeAmount0 };
    args = [
      token1.address,
      isStable,
      safeAmount1,
      get90Percent(safeAmount1, token1.decimals),
      get90Percent(safeAmount0, token0.decimals),
      account,
      deadline,
    ];
  }

  if (isSameAddressZ(token1.address, ZERO_ADDRESS)) {
    functionName = 'addLiquidityNativeToken';
    overrides = { value: safeAmount1 };
    args = [
      token0.address,
      isStable,
      safeAmount0,
      get90Percent(safeAmount0, token1.decimals),
      get90Percent(safeAmount1, token1.decimals),
      account,
      deadline,
    ];
  }

  const { config } = usePrepareContractWrite({
    addressOrName: getInterestDexRouterAddress(chainId),
    functionName,
    contractInterface: InterestDexRouterABI,
    args,
    enabled,
    overrides,
  });

  return useContractWrite(config);
};
