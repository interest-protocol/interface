import { BigNumber } from 'ethers';
import { FC, useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
  addAllowance,
  swapExactNativeTokenForTokens,
  swapExactTokensForNativeToken,
  swapExactTokensForTokens,
  wethDeposit,
  wethWithdraw,
} from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { ZERO_ADDRESS } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG } from '@/svg';
import {
  adjustDecimals,
  getInterestDexRouterAddress,
  getWETHAddress,
  isSameAddress,
  isZeroAddress,
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapButtonProps, SwapViewButtonProps } from './swap.types';
import { handleRoute } from './swap.utils';

const SwapViewButton: FC<SwapViewButtonProps> = ({
  text,
  onClick,
  disabled,
  loadingText,
}) => (
  <Button
    mt="L"
    width="100%"
    variant="primary"
    onClick={onClick}
    disabled={!!loadingText || disabled}
    hover={{ bg: 'accentAlternativeActive' }}
    cursor={loadingText ? 'progress' : disabled ? 'not-allowed' : 'pointer'}
    bg={
      !!loadingText || disabled
        ? 'accentAlternativeActive'
        : 'accentAlternative'
    }
  >
    {loadingText ? (
      <Box as="span" display="flex" justifyContent="center">
        <LoadingSVG width="1rem" height="1rem" />
        <Typography as="span" variant="normal" ml="M" fontSize="S">
          {loadingText}
        </Typography>
      </Box>
    ) : (
      text
    )}
  </Button>
);

const SwapButton: FC<SwapButtonProps> = ({
  needsApproval,
  tokenInAddress,
  swapBase,
  account,
  chainId,
  disabled,
  fetchingAmount,
  fetchingBaseData,
  fetchingBalancesData,
  parsedTokenInBalance,
  updateBalances,
  getValues,
  control,
}) => {
  const { signer } = useGetSigner();
  const [buttonLoadingText, setButtonLoadingText] =
    useState<string | null>(null);
  const dispatch = useDispatch();

  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });

  const handleAddAllowance = useCallback(async () => {
    if (isZeroAddress(tokenInAddress)) return;
    setButtonLoadingText('Approving...');
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        tokenInAddress,
        getInterestDexRouterAddress(validId)
      );
      await updateBalances();
      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      await updateBalances();
      dispatch(coreActions.updateNativeBalance());
      setButtonLoadingText(null);
    }
  }, [account, chainId, signer, tokenInAddress]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: 'Approving...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const handleSwap = useCallback(async () => {
    if (isSameAddress(tokenIn.address, tokenOut.address)) return;
    setButtonLoadingText('Swapping...');
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const { slippage, deadline } = getValues();

      const [tokenInIntegralPart, tokenInDecimalPart] =
        tokenIn.value.split('.');

      const bnAmountIn = adjustDecimals(
        BigNumber.from(tokenInIntegralPart),
        0,
        tokenIn.decimals
      ).add(
        tokenInDecimalPart
          ? adjustDecimals(
              BigNumber.from(tokenInDecimalPart),
              tokenInDecimalPart.length,
              tokenIn.decimals
            )
          : 0
      );

      const [tokenOutIntegralPart, tokenOutDecimalPart] =
        tokenOut.value.split('.');

      const bnAmountOut = adjustDecimals(
        BigNumber.from(tokenOutIntegralPart),
        0,
        tokenOut.decimals
      ).add(
        tokenOutDecimalPart
          ? adjustDecimals(
              BigNumber.from(tokenOutDecimalPart),
              tokenOutDecimalPart.length,
              tokenOut.decimals
            )
          : 0
      );

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
        validId,
        tokenIn.address,
        tokenOut.address,
        swapBase || ZERO_ADDRESS
      );

      const parsedDeadline = Math.floor(
        (new Date().getTime() + deadline * 60 * 1000) / 1000
      );

      if (isZeroAddress(tokenIn.address)) {
        const tx = await swapExactNativeTokenForTokens(
          validId,
          validSigner,
          safeAmountIn,
          minAmountOut,
          route,
          validSigner._address,
          parsedDeadline
        );

        await showTXSuccessToast(tx, validId);
        return;
      }

      if (isZeroAddress(tokenOut.address)) {
        const tx = await swapExactTokensForNativeToken(
          validId,
          validSigner,
          safeAmountIn,
          minAmountOut,
          route,
          validSigner._address,
          parsedDeadline
        );

        await showTXSuccessToast(tx, validId);
        return;
      }

      const tx = await swapExactTokensForTokens(
        validId,
        validSigner,
        safeAmountIn,
        minAmountOut,
        route,
        validSigner._address,
        parsedDeadline
      );

      await showTXSuccessToast(tx, validId);
    } catch {
      throwError('Failed to swap: try a higher slippage or smaller amount');
    } finally {
      dispatch(coreActions.updateNativeBalance());
      await updateBalances();
      setButtonLoadingText(null);
    }
  }, [account, chainId, signer, parsedTokenInBalance, swapBase]);

  const swap = () =>
    showToast(handleSwap(), {
      loading: 'Swapping...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const handleWETHDeposit = async () => {
    if (
      isSameAddress(tokenIn.address, tokenOut.address) ||
      !isZeroAddress(tokenIn.address)
    )
      return;

    setButtonLoadingText('Wrapping...');
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      // sanity check
      if (!isSameAddress(tokenOut.address, getWETHAddress(validId))) return;

      const bnAMount = safeToBigNumber(tokenIn.value, tokenIn.decimals);

      if (bnAMount.isZero())
        throwError(`You cannot deposit 0 tokens ${tokenIn.symbol}`);

      const safeAmount = bnAMount.gte(parsedTokenInBalance)
        ? parsedTokenInBalance
        : bnAMount;

      const tx = await wethDeposit(validId, validSigner, safeAmount);

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Failed to deposit');
    } finally {
      dispatch(coreActions.updateNativeBalance());
      await updateBalances();
      setButtonLoadingText(null);
    }
  };

  const deposit = () =>
    showToast(handleWETHDeposit(), {
      loading: 'Wrapping...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const handleWETHWithdraw = async () => {
    if (
      isSameAddress(tokenIn.address, tokenOut.address) ||
      !isZeroAddress(tokenOut.address)
    )
      return;

    setButtonLoadingText('Unwrapping...');
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      // sanity check
      if (!isSameAddress(tokenIn.address, getWETHAddress(validId))) return;

      const bnAMount = safeToBigNumber(tokenIn.value, tokenIn.decimals);

      if (bnAMount.isZero())
        throwError(`You cannot withdraw 0 tokens ${tokenOut.symbol}`);

      const safeAmount = bnAMount.gte(parsedTokenInBalance)
        ? parsedTokenInBalance
        : bnAMount;

      const tx = await wethWithdraw(validId, validSigner, safeAmount);

      await showTXSuccessToast(tx, validId);
    } catch {
      throwError('Failed to unwrapped');
    } finally {
      dispatch(coreActions.updateNativeBalance());
      await updateBalances();
      setButtonLoadingText(null);
    }
  };

  const withdraw = () =>
    showToast(handleWETHWithdraw(), {
      loading: 'Unwrapping...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const handleProps = () => {
    // NATIVE TOKEN => WRAPPED NATIVE TOKEN
    // NATIVE TOKENS DO NOT NEED ALLOWANCE
    if (
      isZeroAddress(tokenIn.address) &&
      isSameAddress(tokenOut.address, getWETHAddress(chainId))
    )
      return {
        onClick: deposit,
        text: `Wrap ${tokenIn.symbol}`,
      };

    // GIVE ALLOWANCE TO ERC20
    if (needsApproval)
      return {
        onClick: submitAllowance,
        text: 'Approve',
      };

    // WRAPPED NATIVE TOKEN => NATIVE TOKEN
    if (
      isZeroAddress(tokenOut.address) &&
      isSameAddress(tokenIn.address, getWETHAddress(chainId))
    )
      return {
        onClick: withdraw,
        text: `Unwrap ${tokenIn.symbol}`,
      };

    // ERC20 => ERC20 SWAP
    return {
      onClick: swap,
      text: 'Swap',
    };
  };

  const handleLoadingText = () => {
    if (fetchingBalancesData) return 'Fetching balances...';
    if (fetchingBaseData) return 'Loading...';
    if (fetchingAmount) return 'Fetching amounts...';
    return buttonLoadingText;
  };

  return (
    <WalletGuardButton>
      <SwapViewButton
        {...handleProps()}
        disabled={disabled || isNaN(+tokenIn.value) || +tokenIn.value === 0}
        loadingText={handleLoadingText()}
      />
    </WalletGuardButton>
  );
};

export default SwapButton;
