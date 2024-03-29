import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import { incrementTX } from '@/api/analytics';
import { Box, Button } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useAction } from './buttons.hooks';
import { ModalButtonProps } from './buttons.types';

const ModalButton: FC<ModalButtonProps> = ({
  farm,
  modal,
  control,
  handleClose,
  refetch,
  isStake,
  getValues,
}) => {
  const {
    useContractWriteReturn: { writeAsync: action },
  } = useAction(farm, control, modal);
  const t = useTranslations();
  const { address } = useAccount();
  const inputValue = getValues('value') == '' ? '0' : getValues('value');

  const [loading, setLoading] = useState<boolean>(false);

  const handleWithdrawTokens = useCallback(async () => {
    if (farm.stakingAmount.isZero()) return;

    setLoading(true);
    try {
      const tx = await action?.();

      if (tx) tx.wait(2);

      await showTXSuccessToast(tx, farm.chainId);
      incrementTX(address ?? '');

      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'handleWithdrawTokens',
      });
      await refetch();
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'handleWithdrawTokens',
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
    });

  const handleDepositTokens = async () => {
    if (farm.balance.isZero()) return;

    setLoading(true);
    try {
      const tx = await action?.();
      await showTXSuccessToast(tx, farm.chainId);
      incrementTX(address ?? '');

      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'handleDepositTokens',
      });
      await refetch();
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'handleDepositTokens',
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
    });

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
      bg={
        inputValue == '0'
          ? 'disabled'
          : !action
          ? 'disabled'
          : loading
          ? 'accentActive'
          : 'accent'
      }
      hover={{ bg: inputValue != '0' ? 'accentActive' : 'disabled' }}
      onClick={onSubmit}
      disabled={!action || loading || inputValue == '0'}
      cursor={inputValue == '0' ? 'not-allowed' : 'pointer'}
    >
      {loading && (
        <Box mr="M" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
      )}
      {capitalize(t('common.confirm', { isLoading: Number(loading) }))}
    </Button>
  );
};

export default ModalButton;
