import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, throwError } from '@/utils';
import { GAStatus, GAType, logTransactionEvent } from '@/utils/analytics';

import { ApproveButtonProps } from './approve-button.types';

const ApproveButton: FC<ApproveButtonProps> = ({
  refetch,
  buttonProps = { variant: 'primary' },
  pageName,
}) => {
  const t = useTranslations();
  const approve = true;
  const [loading, setLoading] = useState(false);

  const handleAddAllowance = async () => {
    setLoading(true);
    try {
      await refetch();
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
