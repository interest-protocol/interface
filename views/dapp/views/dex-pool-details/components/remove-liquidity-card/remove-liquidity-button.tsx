import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { capitalize } from '@/utils';

import { RemoveLiquidityButtonProps } from './remove-liquidity-card.types';

const RemoveLiquidityButton: FC<RemoveLiquidityButtonProps> = ({
  onClick,
  control,
}) => {
  const t = useTranslations();
  const loading = useWatch({ control, name: 'removeLoading' });

  return (
    <Button
      width="100%"
      variant="primary"
      onClick={onClick}
      disabled={loading}
      hover={{ bg: 'errorActive' }}
      bg={loading ? 'disabled' : 'error'}
    >
      {capitalize(t('common.remove', { isLoading: Number(loading) }))}
    </Button>
  );
};

export default RemoveLiquidityButton;
