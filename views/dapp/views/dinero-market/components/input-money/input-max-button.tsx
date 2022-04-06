import { ethers } from 'ethers';
import { FC, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { IntMath } from '@/sdk/entities/int-math';
import {
  calculateDineroLeftToBorrow,
  safeAmountToWithdrawRepay,
} from '@/utils/dinero-market';

import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  control,
  setValue,
  data,
}) => {
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });

  const repayLoan = useWatch({ control, name: 'repay.loan' });

  const handleSetInnerMax = useCallback(() => {
    if (name === 'borrow.loan') {
      setValue(
        name,
        calculateDineroLeftToBorrow({
          ...data.market,
          userCollateral: data.market.userCollateral.add(
            IntMath.toBigNumber(borrowCollateral || '0')
          ),
        })
          .mul(ethers.utils.parseEther('0.9'))
          .toNumber()
          .toString()
      );
      return;
    }

    if (name === 'repay.collateral') {
      setValue(
        name,
        safeAmountToWithdrawRepay(data.market, IntMath.toBigNumber(repayLoan))
          .toNumber()
          .toString()
      );
      return;
    }

    setValue(name, max ? max.toString() : '0');
  }, [repayLoan, borrowCollateral]);

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
      onClick={handleSetInnerMax}
    >
      max
    </Button>
  );
};

export default InputMaxButton;
