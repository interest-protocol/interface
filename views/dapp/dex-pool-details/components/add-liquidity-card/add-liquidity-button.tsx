import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';

import { Button } from '@/elements';
import { capitalize, showToast } from '@/utils';

import { AddLiquidityCardButtonProps } from './add-liquidity-card.types';

const AddLiquidityButton: FC<AddLiquidityCardButtonProps> = ({
  setLoading,
  loading,
}) => {
  const t = useTranslations();

  const _addLiquidity = async () => {
    console.log('addLiquidity');
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
      bg={loading ? 'disabled' : 'accent'}
      width="100%"
      variant="primary"
      disabled={loading}
      onClick={handleAddLiquidity}
      hover={{ bg: loading ? 'disabled' : 'accentActive' }}
    >
      {capitalize(t('common.add', { isLoading: Number(loading) }))}
    </Button>
  );
};

export default AddLiquidityButton;
