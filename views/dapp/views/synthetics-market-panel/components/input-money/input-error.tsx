import { FC } from 'react';

import { Typography } from '@/elements';

import { InputErrorMessageProps } from './input-money.types';

const InputErrorMessage: FC<InputErrorMessageProps> = ({ errors, labels }) =>
  errors?.[labels[0]]?.[labels[1]] ? (
    <Typography fontSize="S" color="error" variant="normal" textAlign="right">
      {errors?.[labels[0]]?.[labels[1]]?.message}
    </Typography>
  ) : null;

export default InputErrorMessage;
