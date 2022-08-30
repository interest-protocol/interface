import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';

import { RemoveLiquidityButtonProps } from './remove-liquidity-card.types';

const RemoveLiquidityButton: FC<RemoveLiquidityButtonProps> = ({
  onClick,
  control,
}) => {
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
      {loading ? 'Removing' : 'Remove'}
    </Button>
  );
};

export default RemoveLiquidityButton;
