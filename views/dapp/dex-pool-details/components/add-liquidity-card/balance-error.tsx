import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import LiquidityFormMessage from '../liquidity-form-message';
import { BalanceErrorProps } from './add-liquidity-card.types';

const BalanceError: FC<BalanceErrorProps> = ({
  control,
  balance,
  name,
  decimals,
  symbol,
}) => {
  const amount = useWatch({ control, name });

  return amount == balance.toString() ? (
    <LiquidityFormMessage
      color="error"
      message={`You do not have enough ${symbol} balance`}
    />
  ) : null;
};

export default BalanceError;
