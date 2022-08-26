import { ethers } from 'ethers';
import { FC, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { formatMoney, safeToBigNumber } from '@/utils';

import {
  calculateDineroLeftToBorrow,
  safeAmountToWithdrawRepay,
} from '../../dinero-market.utils';
import { InputMaxTagProps } from './input-money.types';

const InputMaxTag: FC<InputMaxTagProps> = ({
  max,
  data,
  isDNR,
  control,
  isBorrow,
  setValue,
}) => {
  const depositCollateral = useWatch({ control, name: 'borrow.collateral' });
  const repayLoan = useWatch({ control, name: 'repay.loan' });
  const loanCollateral = useWatch({ control, name: 'borrow.loan' });

  const recalculatedMax = useMemo(
    () =>
      isBorrow
        ? calculateDineroLeftToBorrow({
            ...data,
            adjustedUserCollateral: data.adjustedUserCollateral.add(
              safeToBigNumber(+depositCollateral)
            ),
          })
            .mul(ethers.utils.parseEther('0.9'))
            .toNumber()
        : safeAmountToWithdrawRepay(
            data,
            safeToBigNumber(+repayLoan)
          ).toNumber(),
    [depositCollateral, repayLoan]
  );

  useEffect(() => {
    if (isBorrow && isDNR && +loanCollateral > recalculatedMax)
      setValue(
        'borrow.loan',
        recalculatedMax.toLocaleString('fullwide', {
          useGrouping: false,
          maximumSignificantDigits: 6,
        })
      );
  }, [loanCollateral, recalculatedMax]);

  return (
    <Box
      py="S"
      px="M"
      mb="-1rem"
      bg="bottomBackground"
      borderRadius="M"
      position="relative"
    >
      <Typography fontSize="S" variant="normal">
        Max:{' '}
        <Typography fontSize="S" variant="normal" fontWeight="bold" as="span">
          {formatMoney(
            ((isDNR && isBorrow) || (!isDNR && !isBorrow)
              ? recalculatedMax
              : max) ?? 0
          )}
        </Typography>
      </Typography>
    </Box>
  );
};

export default InputMaxTag;
