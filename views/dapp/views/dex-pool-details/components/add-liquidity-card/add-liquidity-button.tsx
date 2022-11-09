import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';
import { event } from 'react-ga';

import { GAAction, GACategory } from '@/constants/google-analytics';
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
      event({
        label: 'Error: Add Liquidity',
        action: GAAction.GENERIC,
        category: GACategory.Error,
      });
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
    })
      .then(() =>
        event({
          label: 'Liquidity added',
          action: GAAction.PairAddressAddLiquidity,
          category: GACategory.Operation,
        })
      )
      .catch(() =>
        event({
          label: 'Liquidity not added',
          action: GAAction.PairAddressAddLiquidity,
          category: GACategory.Operation,
        })
      );
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
