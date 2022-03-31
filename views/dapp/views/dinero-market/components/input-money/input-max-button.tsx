import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { calculateDineroLeftToBorrow } from '@/utils/dinero-market';

import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  control,
  setValue,
  data,
}) => {
  const [innerMax, setInnerMax] = useState(max || 0);
  const collateral = useWatch({ control, name: 'borrow.collateral' });

  useEffect(() => {
    if (name === 'borrow.loan' && collateral)
      setInnerMax(
        calculateDineroLeftToBorrow(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).toNumber()
      );
  }, [data, collateral]);

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
