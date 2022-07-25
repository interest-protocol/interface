import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { stringToBigNumber } from '@/utils';

import { BalanceErrorProps } from './liquidity-form.types';

const BalanceError: FC<BalanceErrorProps> = ({
  control,
  balance,
  name,
  decimals,
  symbol,
}) => {
  const amount = useWatch({ control, name });

  return stringToBigNumber(amount, decimals).gt(balance) ? (
    <div>You do not have enough {symbol} balance</div>
  ) : null;
};

export default BalanceError;
