import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useRepay } from '../../dinero-market.hooks';
import { isFormRepayEmpty } from '../../dinero-market.utils';
import { RepayButtonProps } from './borrow-form.types';

const RepayButton: FC<RepayButtonProps> = ({
  data,
  account,
  form,
  repayLoan,
  repayCollateral,
  refetch,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const { writeAsync: repay } = useRepay(
    data,
    account,
    repayCollateral,
    repayLoan
  );

  const handleRepay = async () => {
    try {
      setLoading(true);
      const tx = await repay?.();

      await showTXSuccessToast(tx, data.chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DineroMarketPanel,
        functionName: 'handleRepay',
      });
      form.reset();
    } catch (e: unknown) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DineroMarketPanel,
        functionName: 'handleRepay',
      });
      throwContractCallError(e);
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  const onSubmitRepay = async () => {
    if (isFormRepayEmpty(form)) {
      toast.error(t('dineroMarketAddress.toastError'));
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DineroMarketPanel,
        functionName: 'onSubmitRepay',
      });
      return;
    }

    if (!data.chainId || !account || !data) return;

    await showToast(handleRepay(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loading || !repay}
      justifyContent="center"
      onClick={onSubmitRepay}
      hover={{ bg: !repay ? 'disabled' : 'accentActive' }}
      bg={!repay ? 'disabled' : loading ? 'accentActive' : 'accent'}
      cursor={loading || !repay ? 'not-allowed' : 'pointer'}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
      )}
      <Typography
        as="span"
        fontSize="S"
        variant="normal"
        ml={loading ? 'L' : 'NONE'}
      >
        {t(
          !!+repayLoan && !!+repayCollateral
            ? 'dineroMarketAddress.button.removeCollateralRepay'
            : +repayCollateral
            ? 'dineroMarketAddress.button.removeCollateral'
            : 'dineroMarketAddress.button.repay'
        )}
      </Typography>
    </Button>
  );
};

export default RepayButton;
