import { ethers } from 'ethers';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { IntMath } from '@/sdk/entities/int-math';
import {
  calculateDineroLeftToBorrow,
  safeAmountToWithdraw,
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

  const handleSetInnerMax = () => {
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
        safeAmountToWithdraw(data.market)
          .sub(IntMath.toBigNumber(repayLoan))
          .toNumber()
          .toString()
      );
      return;
    }

    setValue(name, max ? max.toString() : '0');
  };

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
