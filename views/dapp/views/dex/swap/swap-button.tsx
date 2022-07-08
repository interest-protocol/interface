import { BigNumber } from 'ethers';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  addAllowance,
  swapExactNativeTokenForTokens,
  swapExactTokensForNativeToken,
  swapExactTokensForTokens,
} from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { ZERO_ADDRESS } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG } from '@/svg';
import {
  adjustTo18Decimals,
  getInterestDexRouterAddress,
  isSameAddress,
  isZeroAddress,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapButtonProps } from './swap.types';
import { handleRoute } from './utils';

const SwapButton: FC<SwapButtonProps> = ({
  tokenInAddress,
  getValues,
  swapBase,
  account,
  chainId,
  balancesData,
  parsedTokenInBalance,
  updateBalances,
}) => {
  const [loading, setLoading] = useState(false);

  const { signer } = useGetSigner();

  const dispatch = useDispatch();

  const needsApproval =
    !isZeroAddress(tokenInAddress) && balancesData.tokenInAllowance.isZero();

  const handleAddAllowance = useCallback(async () => {
    if (isZeroAddress(tokenInAddress)) return;
    setLoading(true);
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

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [account, chainId, signer, tokenInAddress]);

  const handleSwap = useCallback(async () => {
    const { tokenIn, tokenOut } = getValues();
    if (isSameAddress(tokenIn.address, tokenOut.address)) return;
    setLoading(true);
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const { slippage, deadline } = getValues();

      const [tokenInIntegralPart, tokenInDecimalPart] =
        tokenIn.value.split('.');
      const bnAmountIn = adjustTo18Decimals(
        BigNumber.from(tokenInIntegralPart),
        0,
        tokenIn.decimals
      ).add(
        adjustTo18Decimals(
          BigNumber.from(tokenInDecimalPart),
          tokenInDecimalPart.length,
          tokenIn.decimals
        )
      );
      const [tokenOutIntegralPart, tokenOutDecimalPart] =
        tokenOut.value.split('.');

      const bnAmountOut = adjustTo18Decimals(
        BigNumber.from(tokenOutIntegralPart),
        0,
        tokenOut.decimals
      ).add(
        adjustTo18Decimals(
          BigNumber.from(tokenOutDecimalPart),
          tokenOutDecimalPart.length,
          tokenIn.decimals
        )
      );
      const safeAmountIn = bnAmountIn.gte(parsedTokenInBalance)
        ? parsedTokenInBalance
        : bnAmountIn;

      const minAmountOut = bnAmountOut
        .mul(
          adjustTo18Decimals(
            BigNumber.from(Math.floor(slippage * 100)),
            0,
            tokenOut.decimals - 2
          )
        )
        .div(BigNumber.from(10).pow(tokenOut.decimals));

      const route = handleRoute(
        tokenIn.address,
        tokenOut.address,
        swapBase || ZERO_ADDRESS
      );

      return;

      if (isZeroAddress(tokenIn.address)) {
        const tx = await swapExactNativeTokenForTokens(
          validId,
          validSigner,
          safeAmountIn,
          minAmountOut,
          route,
          validSigner._address,
          new Date().getTime() + deadline * 60 * 1000
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
          new Date().getTime() + deadline * 60 * 1000
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
        new Date().getTime() + deadline * 60 * 1000
      );

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
      await updateBalances();
    }
  }, [account, chainId, signer, parsedTokenInBalance, swapBase]);

  return (
    <WalletGuardButton>
      <Button
        mt="L"
        width="100%"
        variant="primary"
        disabled={loading}
        hover={{ bg: 'accentAlternativeActive' }}
        onClick={needsApproval ? handleAddAllowance : handleSwap}
        bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
      >
        {loading ? (
          <Box as="span" display="flex" justifyContent="center">
            <LoadingSVG width="1rem" height="1rem" />
            <Typography as="span" variant="normal" ml="M" fontSize="S">
              {needsApproval ? 'Approving' : 'Swapping'}...
            </Typography>
          </Box>
        ) : needsApproval ? (
          'Approve'
        ) : (
          'Swapping'
        )}
      </Button>
    </WalletGuardButton>
  );
};

export default SwapButton;
