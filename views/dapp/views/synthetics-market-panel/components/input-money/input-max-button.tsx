import { ethers } from 'ethers';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { numberToString, safeToBigNumber } from '@/utils';

import {
  calculateSyntLeftToMint,
  safeAmountToWithdrawRepay,
} from '../../synthetics-market.utils';
import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({
  max,
  name,
  data,
  control,
  setValue,
}) => {
  const mintCollateral = useWatch({ control, name: 'mint.collateral' });
  const mintSynt = useWatch({ control, name: 'mint.synt' });
  const burnCollateral = useWatch({ control, name: 'burn.collateral' });
  const burnSynt = useWatch({ control, name: 'burn.synt' });

  const maxSyntMint = numberToString(
    calculateSyntLeftToMint({
      ...data,
      adjustedUserCollateral: data.adjustedUserCollateral.add(
        safeToBigNumber(+mintCollateral || 0)
      ),
    })
      .mul(ethers.utils.parseEther('0.9'))
      .toNumber()
  );

  const maxRepayCollateral = numberToString(
    safeAmountToWithdrawRepay(data, safeToBigNumber(+burnSynt)).toNumber()
  );

  useEffect(() => {
    if (+mintSynt > +maxSyntMint) setValue('mint.synt', maxSyntMint);
  }, [mintSynt, maxSyntMint]);

  useEffect(() => {
    if (+burnCollateral > +maxRepayCollateral)
      setValue('burn.collateral', maxRepayCollateral);
  }, [burnCollateral, maxRepayCollateral]);

  useEffect(() => {
    if (FixedPointMath.toBigNumber(burnSynt).gt(data.syntBalance))
      setValue(
        'burn.synt',
        numberToString(FixedPointMath.from(data.syntBalance).toNumber())
      );

    if (
      FixedPointMath.toBigNumber(mintCollateral).gt(
        data.adjustedCollateralBalance
      )
    )
      setValue(
        'mint.collateral',
        numberToString(
          FixedPointMath.from(data.adjustedCollateralBalance).toNumber()
        )
      );
  }, [burnSynt, mintCollateral]);

  const handleSetInnerMax = useCallback(() => {
    if (name === 'mint.synt') {
      setValue(name, maxSyntMint);
      return;
    }

    if (name === 'burn.collateral') {
      setValue(name, maxRepayCollateral);
      return;
    }

    setValue(name, max ? numberToString(max) : '0');
  }, [maxSyntMint, maxRepayCollateral, data, max]);

  const isDisabled = useMemo(() => {
    if (name === 'burn.collateral') return data.userCollateral.isZero();

    if (name === 'burn.synt')
      return data.userSyntMinted.isZero() || data.syntBalance.isZero();

    if (name === 'mint.collateral') return data.collateralBalance.isZero();

    return false;
  }, [
    data.userCollateral.toString(),
    data.syntBalance.toString(),
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
      disabled={isDisabled}
      hover={{ bg: 'accent' }}
      onClick={handleSetInnerMax}
      active={{ bg: 'accentActive' }}
      bg={isDisabled ? 'disabled' : 'bottomBackground'}
    >
      max
    </Button>
  );
};

export default InputMaxButton;
