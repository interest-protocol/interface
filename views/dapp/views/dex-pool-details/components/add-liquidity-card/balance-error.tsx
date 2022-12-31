import { FC } from 'react';

import LiquidityFormMessage from '../liquidity-form-message';
import { BalanceErrorProps } from './add-liquidity-card.types';

const BalanceError: FC<BalanceErrorProps> = ({ symbol }) => (
  <LiquidityFormMessage
    color="error"
    message={`You do not have enough ${symbol} balance`}
  />
);

export default BalanceError;
