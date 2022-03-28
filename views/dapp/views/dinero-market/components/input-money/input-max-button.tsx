import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';

import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  control,
  setValue,
  currencyDiff,
}) => {
  const collateral = useWatch({ control, name: 'borrow.collateral' });
  const liquidationFee = useWatch({ control, name: 'borrow.liquidationFee' });
  const [innerMax, setInnerMax] = useState(max);

  useEffect(() => {
    if (name === 'borrow.loan')
      setInnerMax(liquidationFee * currencyDiff * collateral);
  }, [liquidationFee, collateral]);

  return (
    <Button
      px="M"
      fontSize="S"
      type="button"
      height="100%"
      variant="secondary"
      bg="bottomBackground"
      hover={{ bg: 'accent' }}
      active={{ bg: 'accentActive' }}
      onClick={() => setValue?.(name, +(innerMax ?? 0))}
    >
      max
    </Button>
  );
};
export default InputMaxButton;
