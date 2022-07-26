import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Typography } from '@/elements';

import { TokenAmountProps } from './remove-liquidity-card.types';

const TokenAmount: FC<TokenAmountProps> = ({ Icon, symbol, control, name }) => {
  const amount = useWatch({ control, name });
  return (
    <>
      {Icon}
      <Typography variant="normal" ml="M">
        {symbol}
      </Typography>
      <Typography variant="normal">: {amount}</Typography>
    </>
  );
};

export default TokenAmount;
