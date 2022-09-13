import { ethers } from 'ethers';
import { FC, useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { safeToBigNumber } from '@/utils';
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
            safeToBigNumber(+borrowCollateral || 0)
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
        safeAmountToWithdrawRepay(data.market, safeToBigNumber(+repayLoan))
          .toNumber()
          .toString()
      );
      return;
    }

    setValue(name, max ? max.toString() : '0');
  }, [repayLoan, borrowCollateral, data.market]);

  const isDisabled = useMemo(() => {
    if (name === 'repay.collateral') {
      return data.market.userCollateral.isZero();
    }

    if (name === 'repay.loan') {
      return (
        data.market.userLoan.isZero() ||
        data.dineroPair.getDineroBalance().isZero()
      );
    }

    if (name === 'borrow.collateral') {
      return data.dineroPair.getCollateralBalance().isZero();
    }

    return false;
  }, [
    data.market.userCollateral.toString(),
    data.market.userLoan.toString(),
    data.dineroPair.getDineroBalance().toString(),
    data.dineroPair.getCollateralBalance().toString(),
    name,
  ]);

  return (
    <Button
      px="M"
      fontSize="S"
      type="button"
      height="100%"
      variant="secondary"
      bg={isDisabled ? 'disabled' : 'bottomBackground'}
      hover={{ bg: 'accent' }}
      active={{ bg: 'accentActive' }}
      disabled={isDisabled}
      onClick={handleSetInnerMax}
    >
      max
    </Button>
  );
};

export default InputMaxButton;
