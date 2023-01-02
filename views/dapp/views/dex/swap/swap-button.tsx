import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  isSameAddress,
  isZeroAddress,
  showToast,
  throwError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapButtonProps, SwapViewButtonProps } from './swap.types';

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
    hover={{
      bg: !!loadingText || disabled ? 'disabled' : 'accentAlternativeActive',
    }}
    cursor={loadingText ? 'progress' : disabled ? 'not-allowed' : 'pointer'}
    bg={!!loadingText || disabled ? 'disabled' : 'accentAlternative'}
  >
    {loadingText ? (
      <Box as="span" display="flex" justifyContent="center">
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
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
  fetchingAmount,
  fetchingBaseData,
  fetchingBalancesData,
  control,
}) => {
  const t = useTranslations();
  const [buttonLoadingText, setButtonLoadingText] =
    useState<string | null>(null);

  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });

  const handleAddAllowance = useCallback(async () => {
    if (isZeroAddress(tokenInAddress)) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleAddAllowance',
      });
      return;
    }
    setButtonLoadingText(t('common.approve', { isLoading: 1 }));
    try {
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleAddAllowance',
      });
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleAddAllowance',
      });
      throwError(t('error.generic'), e);
    } finally {
      setButtonLoadingText(null);
    }
  }, [tokenInAddress]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: capitalize(t('common.approve', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  const handleSwap = useCallback(async () => {
    if (isSameAddress(tokenIn.address, tokenOut.address)) return;
    setButtonLoadingText(t('common.swap', { isLoading: 1 }) + '...');
    try {
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleSwap',
      });
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleSwap',
      });
      throwError(t('dexSwap.swapMessage.error'));
    } finally {
      setButtonLoadingText(null);
    }
  }, [swapBase]);

  const swap = () =>
    showToast(handleSwap(), {
      loading: capitalize(t('common.swap', { isLoading: 1 }) + '...'),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  /*
  const handleWETHDeposit = async () => {
    if (
      isSameAddress(tokenIn.address, tokenOut.address) ||
      !isZeroAddress(tokenIn.address)
    ) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHDeposit',
      });
      return;
    }

    setButtonLoadingText(t('common.wrap', { isLoading: 1 }));
    try {
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHDeposit',
      });
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHDeposit',
      });
      throwError(t('dexSwap.error.wethDeposit'));
    } finally {
      setButtonLoadingText(null);
    }
  };

  const deposit = () =>
    showToast(handleWETHDeposit(), {
      loading: capitalize(t('common.wrap', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  const handleWETHWithdraw = async () => {
    if (
      isSameAddress(tokenIn.address, tokenOut.address) ||
      !isZeroAddress(tokenOut.address)
    ) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHWithdraw',
      });
      return;
    }

    setButtonLoadingText(t('common.unwrap', { isLoading: 1 }));
    try {
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHWithdraw',
      });
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexSwap,
        functionName: 'handleWETHWithdraw',
      });
      throwError(t('dexSwap.error.wethWithdraw'));
    } finally {
      setButtonLoadingText(null);
    }
  };
  
  const withdraw = () =>
    showToast(handleWETHWithdraw(), {
      loading: capitalize(t('common.unwrap', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });*/

  const handleProps = () => {
    // GIVE ALLOWANCE TO ERC20
    if (needsApproval)
      return {
        onClick: submitAllowance,
        text: capitalize(t('common.approve', { isLoading: 0 })),
      };

    // ERC20 => ERC20 SWAP
    return {
      onClick: swap,
      text: capitalize(t('common.swap', { isLoading: 0 })),
    };
  };

  const handleLoadingText = (): string => {
    if (fetchingBalancesData) return t('common.fetchingBalances') + '...';
    if (fetchingBaseData) return t('common.load', { isLoading: 1 });
    if (fetchingAmount) return t('dexSwap.swapMessage.fetchingAmounts') + '...';
    return buttonLoadingText as string;
  };

  const handleIsDisabled = () => {
    return false;
  };

  return (
    <WalletGuardButton>
      <SwapViewButton
        {...handleProps()}
        disabled={handleIsDisabled()}
        loadingText={capitalize(handleLoadingText())}
      />
    </WalletGuardButton>
  );
};

export default SwapButton;
