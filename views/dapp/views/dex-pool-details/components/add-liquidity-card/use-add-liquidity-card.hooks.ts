import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useNow } from 'use-intl';
import {
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi';

import { ZERO_ADDRESS } from '@/sdk';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import {
  getBNPercent,
  getInterestDexRouterAddress,
  isSameAddressZ,
  stringToBigNumber,
} from '@/utils';

import { UseAddLiquidityArgs } from './add-liquidity-card.types';

const get90Percent = getBNPercent(90);

export const useAddLiquidity = ({
  chainId,
  isStable,
  account,
  control,
  tokens,
}: UseAddLiquidityArgs) => {
  const token0Amount = useWatch({ control, name: 'token0Amount' });
  const token1Amount = useWatch({ control, name: 'token1Amount' });

  const [token0, token1] = tokens;

  const amount0 = stringToBigNumber(token0Amount || '0', token0.decimals);

  const amount1 = stringToBigNumber(token1Amount || '0', token1.decimals);

  // 5 minutes
  const now = useNow({ updateInterval: 30000 });

  const deadline = Math.floor((now.getTime() + 8 * 60 * 1000) / 1000);

  const [safeAmount0] = useDebounce(
    amount0.gt(token0.balance) ? token0.balance : amount0,
    500,
    { equalityFn: (x, y) => x.eq(y) }
  );
  const [safeAmount1] = useDebounce(
    amount1.gt(token1.balance) ? token1.balance : amount1,
    500,
    { equalityFn: (x, y) => x.eq(y) }
  );

  let functionName = 'addLiquidity';
  let args = [
    token0.address,
    token1.address,
    isStable,
    safeAmount0,
    safeAmount1,
    get90Percent(safeAmount0, token0.decimals),
    get90Percent(safeAmount1, token1.decimals),
    account,
    deadline,
  ];
  let overrides: UsePrepareContractWriteConfig['overrides'] = {};
  const enabled =
    !tokens[0].allowance.isZero() &&
    !tokens[1].allowance.isZero() &&
    !safeAmount0.isZero() &&
    !safeAmount1.isZero() &&
    !tokens[0].allowance.isZero() &&
    !tokens[1].allowance.isZero();

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

  const { config, ...usePrepareContractReturn } = usePrepareContractWrite({
    address: getInterestDexRouterAddress(chainId),
    abi: InterestDexRouterABI,
    functionName,
    args,
    enabled,
    overrides,
  });

  return {
    useContractWriteReturn: useContractWrite(config),
    usePrepareContractReturn,
  };
};
