import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';

import { Button } from '@/elements';
import { capitalize, showToast, throwError } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { AddLiquidityCardButtonProps } from './add-liquidity-card.types';

const AddLiquidityButton: FC<AddLiquidityCardButtonProps> = ({
  addLiquidity,
  refetch,
  setLoading,
  loading,
}) => {
  const t = useTranslations();

  const _addLiquidity = async () => {
    try {
      setLoading(true);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexPoolDetails,
        functionName: '_addLiquidity',
      });
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexPoolDetails,
        functionName: '_addLiquidity',
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
