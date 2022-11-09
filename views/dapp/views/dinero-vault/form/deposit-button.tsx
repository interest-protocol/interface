import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useState } from 'react';
import { FC } from 'react';
import { event } from 'react-ga';
import { useWatch } from 'react-hook-form';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Button } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';

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
    } catch (e) {
      event({
        label: 'Error: Handle Deposit - dinero vault deposit button',
        action: GAAction.GENERIC,
        category: GACategory.Error,
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
    })
      .then(() =>
        event({
          label: 'Deposited successfully',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      )
      .catch(() =>
        event({
          label: 'Deposited unsuccessfully.',
          action: GAAction.Deposit,
          category: GACategory.Operation,
        })
      );
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
          <LoadingSVG width="100%" />
        </Box>
      )}
      {capitalize(t('dineroVault.deposit', { isLoading: +loading }))}
    </Button>
  );
};

export default DepositButton;
