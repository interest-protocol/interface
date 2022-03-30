import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';

import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  control,
  setValue,
  ltvRatio,
  currencyDiff,
}) => {
  const [innerMax, setInnerMax] = useState(max);
  const collateral = useWatch({ control, name: 'borrow.collateral' });

  useEffect(() => {
    if (name === 'borrow.loan' && ltvRatio && collateral)
      setInnerMax((ltvRatio / 100) * +collateral * currencyDiff);
  }, [ltvRatio, collateral]);

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
      onClick={() => setValue?.(name, `${innerMax ?? 0}`)}
    >
      max
    </Button>
  );
};
export default InputMaxButton;
