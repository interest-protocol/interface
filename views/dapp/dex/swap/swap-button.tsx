import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast } from '@/utils';

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
  disabled,
  fetchingAmount,
  fetchingBaseData,
  fetchingBalancesData,
  parsedTokenInBalance,
  control,
}) => {
  const t = useTranslations();
  const [buttonLoadingText, setButtonLoadingText] =
    useState<string | null>(null);

  const tokenIn = useWatch({ control, name: 'tokenIn' });

  const handleAddAllowance = useCallback(async () => {
    setButtonLoadingText(t('common.approve', { isLoading: 1 }));
  }, [tokenInAddress]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: capitalize(t('common.approve', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  const handleSwap = useCallback(async () => {
    setButtonLoadingText(t('common.swap', { isLoading: 1 }) + '...');
  }, [parsedTokenInBalance, swapBase]);

  const swap = () =>
    showToast(handleSwap(), {
      loading: capitalize(t('common.swap', { isLoading: 1 }) + '...'),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  const handleProps = () => {
    // NATIVE TOKEN => WRAPPED NATIVE TOKEN
    // NATIVE TOKENS DO NOT NEED ALLOWANCE
    // GIVE ALLOWANCE TO ERC20
    if (needsApproval)
      return {
        onClick: submitAllowance,
        text: capitalize(t('common.approve', { isLoading: 0 })),
      };

    // WRAPPED NATIVE TOKEN => NATIVE TOKEN

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
    if (
      (disabled || isNaN(+tokenIn.value) || +tokenIn.value === 0) &&
      !needsApproval
    )
      return true;

    if (fetchingAmount || fetchingBaseData || fetchingAmount) return true;

    return false;
  };

  return (
    <SwapViewButton
      {...handleProps()}
      disabled={handleIsDisabled()}
      loadingText={capitalize(handleLoadingText())}
    />
  );
};

export default SwapButton;
