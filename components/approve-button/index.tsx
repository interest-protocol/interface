import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { useApprove } from '@/hooks';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';
import { GAStatus, GAType, logTransactionEvent } from '@/utils/analytics';

import { ApproveButtonProps } from './approve-button.types';

const ApproveButton: FC<ApproveButtonProps> = ({
  enabled,
  spender,
  contract,
  chainId,
  refetch,
  buttonProps = { variant: 'primary' },
  pageName,
}) => {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);
  const { writeAsync: approve } = useApprove(contract, spender, { enabled });

  const handleAddAllowance = async () => {
    setLoading(true);
    try {
      const tx = await approve?.();
      if (tx) await tx.wait(2);

      await refetch();
      await showTXSuccessToast(tx, chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: pageName,
        functionName: 'handleAddAllowance',
      });
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: pageName,
        functionName: 'handleAddAllowance',
      });
      throwError(t('error.generic'), e);
    } finally {
      setLoading(false);
    }
  };

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: capitalize(`${t('common.approve', { isLoading: 1 })}`),
      success: capitalize(t('common.success')),
      error: ({ message }) => message,
    });

  return (
    <Button
      disabled={loading || !approve}
      hover={{ bg: !approve ? 'disabled' : 'accentActive' }}
      onClick={submitAllowance}
      bg={!approve ? 'disabled' : loading ? 'accentActive' : 'accent'}
      cursor={loading || !approve ? 'not-allowed' : 'pointer'}
      {...buttonProps}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
      )}
      <Typography
        fontSize="S"
        as="span"
        variant="normal"
        ml={loading ? 'L' : 'NONE'}
      >
        {capitalize(t('common.approve', { isLoading: +loading }))}
      </Typography>
    </Button>
  );
};

export default ApproveButton;
