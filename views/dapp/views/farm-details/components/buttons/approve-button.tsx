import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useCallback, useState } from 'react';

import { Typography } from '@/elements';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useApprove } from '@/hooks';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  getCasaDePapelAddress,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import ErrorButton from '../error-button';
import { ApproveButtonProps } from './buttons.types';

const ApproveButton: FC<ApproveButtonProps> = ({ farm, refetch }) => {
  const {
    useContractWriteReturn: { writeAsync: _approve, isError: isWriteError },
    usePrepareContractReturn: { isError: isPrepareError },
  } = useApprove(
    farm.stakingTokenAddress,
    getCasaDePapelAddress(farm.chainId),
    { enabled: farm.allowance.isZero() }
  );

  const t = useTranslations();
  const [loadingPool, setLoadingPool] = useState<boolean>(false);

  const approve = useCallback(async () => {
    try {
      setLoadingPool(true);
      const tx = await _approve?.();
      await showTXSuccessToast(tx, farm.chainId);

      if (tx) await tx.wait(2);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'approve',
      });
      await refetch();
    } catch (e) {
      setLoadingPool(false);
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.FarmsDetails,
        functionName: 'approve',
      });
      throwError(t('error.generic'), e);
    } finally {
      setLoadingPool(false);
    }
  }, [_approve, refetch, farm.chainId]);

  const handleApprove = useCallback(
    () =>
      showToast(approve(), {
        success: capitalize(t('common.success')),
        error: propOr(capitalize(t('common.error')), 'message'),
        loading: capitalize(t('common.approve', { isLoading: 1 })),
      }),
    [approve]
  );

  if (!(isWriteError || isPrepareError))
    <ErrorButton
      error={t(
        isPrepareError ? 'error.contract.prepare' : 'error.contract.write'
      )}
    />;

  return (
    <Button
      variant="primary"
      onClick={handleApprove}
      hover={{ bg: 'accentActive' }}
    >
      {loadingPool ? (
        <Box as="span" display="flex" justifyContent="center">
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
          <Typography
            as="span"
            variant="normal"
            ml="M"
            fontSize="S"
            textTransform="capitalize"
          >
            {capitalize(t('common.approve', { isLoading: 1 }))}
          </Typography>
        </Box>
      ) : (
        <Typography
          as="span"
          variant="normal"
          ml="M"
          fontSize="S"
          textTransform="capitalize"
        >
          {
            (t('common.approve', { isLoading: 0 }) +
              ' ' +
              t(farm.id === 0 ? 'common.pool' : 'common.farm')) as string
          }
        </Typography>
      )}
    </Button>
  );
};

export default ApproveButton;
