import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Typography } from '@/elements';
import { formatDollars, formatMoney } from '@/utils';

import { InputSuffixProps } from './input-money.types';

const InputSuffix: FC<InputSuffixProps> = ({
  name,
  control,
  price,
  isStable,
}) => {
  const value = useWatch({ control, name });
  const format = isStable ? formatDollars : formatMoney;
  return (
    <Typography fontSize="S" variant="normal" color="textSecondary">
      {format((+value ?? 0) * price)}
    </Typography>
  );
};

export default InputSuffix;
