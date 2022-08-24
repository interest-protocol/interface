import { ethers } from 'ethers';
import { FC, useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { safeToBigNumber } from '@/utils';

import {
  calculateDineroLeftToBorrow,
  safeAmountToWithdrawRepay,
} from '../../dinero-market.utils';
import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  data,
  control,
  setValue,
}) => {
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });

  const repayLoan = useWatch({ control, name: 'repay.loan' });

  const handleSetInnerMax = useCallback(() => {
    if (name === 'borrow.loan') {
      setValue(
        name,
        calculateDineroLeftToBorrow({
          ...data,
          userCollateral: data.userCollateral.add(
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
        safeAmountToWithdrawRepay(data, safeToBigNumber(+repayLoan))
          .toNumber()
          .toString()
      );
      return;
    }

    setValue(name, max ? max.toString() : '0');
  }, [repayLoan, borrowCollateral, data]);

  const isDisabled = useMemo(() => {
    if (name === 'repay.collateral') {
      return data.userCollateral.isZero();
    }

    if (name === 'repay.loan') {
      return data.loanElastic.isZero() || data.dnrBalance.isZero();
    }

    if (name === 'borrow.collateral') {
      return data.collateralBalance.isZero();
    }

    return false;
  }, [
    data.userCollateral.toString(),
    data.loanElastic.toString(),
    data.dnrBalance.toString(),
    data.collateralBalance.toString(),
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
