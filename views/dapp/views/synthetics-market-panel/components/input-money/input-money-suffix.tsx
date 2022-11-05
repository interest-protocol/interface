import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Typography } from '@/elements';
import { formatDollars } from '@/utils';

import { InputMoneySuffixProps } from './input-money.types';

const InputMoneySuffix: FC<InputMoneySuffixProps> = ({
  name,
  control,
  amountUSD,
}) => {
  const value = useWatch({ control, name });

  return (
    <Typography fontSize="S" variant="normal" color="textSecondary">
      {formatDollars((+value ?? 0) * amountUSD)}
    </Typography>
  );
};

export default InputMoneySuffix;
