import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import {
  getBNPercent,
  getInterestDexRouterAddress,
  processWrappedNativeTokenAddress,
  stringToBigNumber,
} from '@/utils';

import { UseRemoveLiquidityArgs } from './remove-liquidity-card.types';

const to97Percent = getBNPercent(97);

export const useRemoveLiquidity = ({
  control,
  tokens,
  lpBalance,
  chainId,
  account,
  isStable,
}: UseRemoveLiquidityArgs) => {
  const lpAmount = useWatch({ control, name: 'lpAmount' });
  const token0Amount = useWatch({ control, name: 'token0Amount' });
  const token1Amount = useWatch({ control, name: 'token1Amount' });

  const lpBNAmount = stringToBigNumber(lpAmount, 18);

  const safeLPAmount = lpBNAmount.gt(lpBalance) ? lpBalance : lpBNAmount;
  const token0BNAmount = stringToBigNumber(token0Amount, tokens[0].decimals);
  const token1BNAmount = stringToBigNumber(token1Amount, tokens[1].decimals);

  const [debouncedLPAmount] = useDebounce(safeLPAmount, 500, {
    equalityFn: (x, y) => x.eq(y),
  });
  const [debouncedToken0Amount] = useDebounce(token0BNAmount, 500, {
    equalityFn: (x, y) => x.eq(y),
  });
  const [debouncedToken1Amount] = useDebounce(token1BNAmount, 500, {
    equalityFn: (x, y) => x.eq(y),
  });

  // 5 minutes
  const [deadline] = useDebounce(
    Math.ceil((new Date().getTime() + 5 * 60 * 1000) / 1000),
    10000
  );

  const { config } = usePrepareContractWrite({
    addressOrName: getInterestDexRouterAddress(chainId),
    functionName: 'removeLiquidity',
    contractInterface: InterestDexRouterABI,
    args: [
      processWrappedNativeTokenAddress(chainId, tokens[0].address),
      processWrappedNativeTokenAddress(chainId, tokens[1].address),
      isStable,
      debouncedLPAmount,
      to97Percent(debouncedToken0Amount, tokens[0].decimals),
      to97Percent(debouncedToken1Amount, tokens[1].decimals),
      account,
      deadline,
    ],
    enabled: !debouncedLPAmount.isZero(),
  });

  return useContractWrite(config);
};
