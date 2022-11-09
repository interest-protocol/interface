import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useCallback, useState } from 'react';
import { event } from 'react-ga';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Button } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';

import { useAction } from './buttons.hooks';
import { ModalButtonProps } from './buttons.types';

const ModalButton: FC<ModalButtonProps> = ({
  farm,
  modal,
  control,
  handleClose,
  refetch,
  isStake,
}) => {
  const { writeAsync: action } = useAction(farm, control, modal);
  const t = useTranslations();

  const [loading, setLoading] = useState<boolean>(false);

  const handleWithdrawTokens = useCallback(async () => {
    if (farm.stakingAmount.isZero()) return;

    setLoading(true);
    try {
      const tx = await action?.();

      if (tx) tx.wait(2);

      await showTXSuccessToast(tx, farm.chainId);
      await refetch();
    } catch (e) {
      event({
        label: 'Error: Handle withdraw tokens - farm details',
        action: GAAction.GENERIC,
        category: GACategory.Error,
      });
      throw e || new Error(t('error.generic'));
    } finally {
      setLoading(false);
      handleClose();
    }
  }, [farm.stakingAmount.toString(), action]);

  const handleUnstake = () =>
    showToast(handleWithdrawTokens(), {
      loading: capitalize(t('common.unstake', { isLoading: 1 })),
      error: propOr('common.error', 'message'),
      success: capitalize(t('common.success')),
    })
      .then(() =>
        event({
          label: 'Deposit unstake successful',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      )
      .catch(() =>
        event({
          label: 'Deposit unstake unsuccessful',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      );

  const handleDepositTokens = async () => {
    if (farm.balance.isZero()) return;

    setLoading(true);
    try {
      const tx = await action?.();
      await showTXSuccessToast(tx, farm.chainId);
      await refetch();
    } catch (e) {
      event({
        label: 'Error: Handle Deposit Tokens - farm details',
        action: GAAction.GENERIC,
        category: GACategory.Error,
      });
      throwError(t('error.generic'), e);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleStake = () =>
    showToast(handleDepositTokens(), {
      loading: capitalize(t('common.stake', { isLoading: 1 })),
      error: propOr('common.error', 'message'),
      success: capitalize(t('common.success')),
    })
      .then(() =>
        event({
          label: 'Deposit stake successful',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      )
      .catch(() =>
        event({
          label: 'Deposit stake unsuccessful',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      );

  const onSubmit = async () => {
    isStake ? await handleStake() : await handleUnstake();
  };

  return (
    <Button
      ml="L"
      flex="1"
      display="flex"
      variant="primary"
      alignItems="center"
      justifyContent="center"
      bg={!action ? 'disabled' : loading ? 'accentActive' : 'accent'}
      hover={{ bg: 'accentActive' }}
      onClick={onSubmit}
      disabled={!action || loading}
    >
      {loading && (
        <Box mr="M" width="1rem">
          <LoadingSVG width="100%" />
        </Box>
      )}
      {capitalize(t('common.confirm', { isLoading: Number(loading) }))}
    </Button>
  );
};

export default ModalButton;
