import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useState } from 'react';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useDeposit } from '../dinero-vault.hooks';
import { DepositButtonProps } from '../dinero-vault.types';

const DepositButton: FC<DepositButtonProps> = ({ control, data, refetch }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const value = useWatch({ control, name: 'value' });

  const { writeAsync } = useDeposit(data, value);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const tx = await writeAsync?.();
      if (tx) await tx.wait(2);

      await refetch();
      await showTXSuccessToast(tx, data.chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DineroVault,
        functionName: 'handleDeposit',
      });
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DineroVault,
        functionName: 'handleDeposit',
      });
      throwError(t('error.generic'), e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitDeposit = async () => {
    if (!data.chainId || !data) return;

    await showToast(handleDeposit(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return (
    <Button
      onClick={onSubmitDeposit}
      disabled={!writeAsync || loading}
      variant="primary"
      width="100%"
      py="L"
      mb="1.5rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={!writeAsync ? 'disabled' : 'primary'}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem" mr="M">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
      )}
      {capitalize(t('dineroVault.deposit', { isLoading: +loading }))}
    </Button>
  );
};

export default DepositButton;
