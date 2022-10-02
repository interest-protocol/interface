import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';

import { Button } from '@/elements';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';

import { AddLiquidityCardButtonProps } from './add-liquidity-card.types';

const AddLiquidityButton: FC<AddLiquidityCardButtonProps> = ({
  addLiquidity,
  chainId,
  refetch,
  setLoading,
  loading,
}) => {
  const t = useTranslations();

  const _addLiquidity = async () => {
    try {
      setLoading(true);
      const tx = await addLiquidity?.();
      await showTXSuccessToast(tx, chainId);
    } catch {
      throwError(t('error.generic'));
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  const handleAddLiquidity = () => {
    showToast(_addLiquidity(), {
      loading: `${capitalize(t('common.add', { isLoading: 1 }))}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });
  };

  return (
    <Button
      bg={!addLiquidity || loading ? 'disabled' : 'accent'}
      width="100%"
      variant="primary"
      disabled={loading || !addLiquidity}
      onClick={handleAddLiquidity}
      hover={{ bg: loading || !addLiquidity ? 'disabled' : 'accentActive' }}
    >
      {capitalize(t('common.add', { isLoading: Number(loading) }))}
    </Button>
  );
};

export default AddLiquidityButton;
