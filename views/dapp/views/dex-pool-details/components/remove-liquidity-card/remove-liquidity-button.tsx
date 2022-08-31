import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';

import { RemoveLiquidityButtonProps } from './remove-liquidity-card.types';

const RemoveLiquidityButton: FC<RemoveLiquidityButtonProps> = ({
  onClick,
  control,
}) => {
  const t = useTranslations('common');
  const loading = useWatch({ control, name: 'loading' });

  return (
    <Button
      width="100%"
      variant="primary"
      onClick={onClick}
      disabled={loading}
      hover={{ bg: 'errorActive' }}
      bg={loading ? 'disabled' : 'error'}
    >
      {loading ? t('removeLoading') : t('remove')}
    </Button>
  );
};

export default RemoveLiquidityButton;
