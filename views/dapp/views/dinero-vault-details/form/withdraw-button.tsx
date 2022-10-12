import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useState } from 'react';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';

import { useWithdraw } from '../dinero-vault-details.hooks';
import { WithdrawButtonProps } from '../dinero-vault-details.types';

const WithdrawButton: FC<WithdrawButtonProps> = ({
  control,
  data,
  refetch,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const value = useWatch({ control, name: 'value' });

  const { writeAsync } = useWithdraw(data, value);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const tx = await writeAsync?.();
      if (tx) await tx.wait(2);

      await refetch();
      await showTXSuccessToast(tx, data.chainId);
    } catch (e) {
      throwError(t('error.generic'), e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitWithdraw = async () => {
    if (!data.chainId || !data) return;

    await showToast(handleWithdraw(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return (
    <Button
      onClick={onSubmitWithdraw}
      disabled={!writeAsync || loading}
      variant="primary"
      width="100%"
      py="L"
      mb="1.5rem"
      bg={!writeAsync ? 'disabled' : 'primary'}
    >
      {capitalize(t('vaultAddress.withdraw', { isLoading: +loading }))}
    </Button>
  );
};

export default WithdrawButton;
