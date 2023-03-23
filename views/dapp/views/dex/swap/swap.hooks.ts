import { PrepareWriteContractConfig } from '@wagmi/core';
import { BigNumber } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import WETHABI from '@/sdk/abi/weth.abi.json';
import {
  adjustDecimals,
  getInterestDexRouterAddress,
  getWETHAddress,
  isSameAddress,
  isSameAddressZ,
  isZeroAddress,
  safeToBigNumber,
} from '@/utils';
import { handleRoute } from '@/views/dapp/views/dex/swap/swap.utils';

import {
  UseSwapArgs,
  UseWETHDepositArgs,
  UseWETHWithdrawArgs,
} from './swap.types';

export const useSwap = ({
  localSettings,
  tokenIn,
  tokenOut,
  swapBase,
  parsedTokenInBalance,
  account,
  chainId,
  needsApproval,
  timestamp,
}: UseSwapArgs) => {
  const [debouncedTokenIn] = useDebounce(tokenIn, 500, {
    equalityFn: (x, y) =>
      isSameAddressZ(x.address, y.address) && x.value === y.value,
  });
  const [debouncedTokenOut] = useDebounce(tokenOut, 500, {
    equalityFn: (x, y) =>
      isSameAddressZ(x.address, y.address) && x.value === y.value,
  });

  const { deadline, slippage } = localSettings;

  const [tokenInIntegralPart, tokenInDecimalPart] =
    debouncedTokenIn.value.split('.');

  const bnAmountIn = tokenInIntegralPart
    ? adjustDecimals(
        BigNumber.from(tokenInIntegralPart),
        0,
        debouncedTokenIn.decimals
      ).add(
        tokenInDecimalPart
          ? adjustDecimals(
              BigNumber.from(tokenInDecimalPart),
              tokenInDecimalPart.length,
              debouncedTokenIn.decimals
            )
          : 0
      )
    : ZERO_BIG_NUMBER;

  const [tokenOutIntegralPart, tokenOutDecimalPart] =
    debouncedTokenOut.value.split('.');

  const bnAmountOut = tokenOutIntegralPart
    ? adjustDecimals(
        BigNumber.from(tokenOutIntegralPart),
        0,
        debouncedTokenOut.decimals
      ).add(
        tokenOutDecimalPart
          ? adjustDecimals(
              BigNumber.from(tokenOutDecimalPart),
              tokenOutDecimalPart.length,
              debouncedTokenOut.decimals
            )
          : 0
      )
    : ZERO_BIG_NUMBER;

  const safeAmountIn = bnAmountIn.gte(parsedTokenInBalance)
    ? parsedTokenInBalance
    : bnAmountIn;

  const slippageAmount = bnAmountOut
    .mul(
      adjustDecimals(
        BigNumber.from(Math.floor(+slippage * 100)),
        0,
        tokenOut.decimals
      )
    ) // Since we multiplied slippage by 100, we need to add 4 decimal houses here
    .div(BigNumber.from(10).pow(tokenOut.decimals + 4));

  const minAmountOut = bnAmountOut.sub(slippageAmount);

  const route = handleRoute(
    chainId,
    tokenIn.address,
    tokenOut.address,
    swapBase || ZERO_ADDRESS
  );

  const extraTime = (+deadline + 2) * 60;

  const parsedDeadline = Math.floor(timestamp / 1000) + extraTime;

  let args: Array<any> = [
    safeAmountIn,
    minAmountOut,
    route,
    account,
    parsedDeadline,
  ];
  let functionName = 'swapExactTokensForTokens';
  let overrides: PrepareWriteContractConfig['overrides'] = {};

  if (isZeroAddress(tokenIn.address)) {
    functionName = 'swapExactNativeTokenForTokens';
    overrides = { value: safeAmountIn };
    args = [minAmountOut, route, account, parsedDeadline];
  }

  if (isZeroAddress(tokenOut.address)) {
    functionName = 'swapExactTokensForNativeToken';
    args = [safeAmountIn, minAmountOut, route, account, parsedDeadline];
  }

  const { config, ...usePrepareContractReturn } = usePrepareContractWrite({
    address: getInterestDexRouterAddress(chainId),
    abi: InterestDexRouterABI,
    functionName,
    args,
    overrides,
    enabled:
      !needsApproval &&
      +debouncedTokenIn.value > 0 &&
      +debouncedTokenOut.value > 0 &&
      !(
        isSameAddress(tokenOut.address, getWETHAddress(chainId)) &&
        isZeroAddress(tokenIn.address)
      ) &&
      !(
        isSameAddress(tokenIn.address, getWETHAddress(chainId)) &&
        isZeroAddress(tokenOut.address)
      ),
  });

  return {
    useContractWriteReturn: useContractWrite(config),
    usePrepareContractReturn,
  };
};

export const useWETHDeposit = ({
  chainId,
  tokenIn,
  tokenOut,
  parsedTokenInBalance,
  needsApproval,
}: UseWETHDepositArgs) => {
  const [debouncedTokenIn] = useDebounce(tokenIn, 500, {
    equalityFn: (x, y) =>
      isSameAddressZ(x.address, y.address) && x.value === y.value,
  });

  const bnAMount = debouncedTokenIn.value
    ? safeToBigNumber(debouncedTokenIn.value, debouncedTokenIn.decimals)
    : ZERO_BIG_NUMBER;

  const safeAmount = bnAMount.gte(parsedTokenInBalance)
    ? parsedTokenInBalance
    : bnAMount;

  const { config, ...usePrepareContractReturn } = usePrepareContractWrite({
    address: getWETHAddress(chainId),
    functionName: 'deposit',
    abi: WETHABI,
    overrides: { value: safeAmount },
    enabled:
      !needsApproval &&
      !bnAMount.isZero() &&
      isSameAddress(tokenOut.address, getWETHAddress(chainId)) &&
      isZeroAddress(tokenIn.address),
  });

  return {
    useContractWriteReturn: useContractWrite(config),
    usePrepareContractReturn,
  };
};

export const useWETHWithdraw = ({
  parsedTokenInBalance,
  tokenIn,
  tokenOut,
  chainId,
  needsApproval,
}: UseWETHWithdrawArgs) => {
  const [debouncedTokenIn] = useDebounce(tokenIn, 500, {
    equalityFn: (x, y) =>
      isSameAddressZ(x.address, y.address) && x.value === y.value,
  });

  const bnAMount = debouncedTokenIn.value
    ? safeToBigNumber(debouncedTokenIn.value, debouncedTokenIn.decimals)
    : ZERO_BIG_NUMBER;

  const safeAmount = bnAMount.gte(parsedTokenInBalance)
    ? parsedTokenInBalance
    : bnAMount;

  const { config, ...usePrepareContractReturn } = usePrepareContractWrite({
    address: getWETHAddress(chainId),
    functionName: 'withdraw',
    abi: WETHABI,
    args: [safeAmount],
    enabled:
      !needsApproval &&
      !bnAMount.isZero() &&
      isSameAddress(tokenIn.address, getWETHAddress(chainId)) &&
      isZeroAddress(tokenOut.address),
  });

  return {
    useContractWriteReturn: useContractWrite(config),
    usePrepareContractReturn,
  };
};
