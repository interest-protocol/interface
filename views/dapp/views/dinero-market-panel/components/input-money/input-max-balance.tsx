import { ethers } from 'ethers';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { formatMoney, safeToBigNumber } from '@/utils';

import {
  calculateDineroLeftToBorrow,
  safeAmountToWithdrawRepay,
} from '../../dinero-market.utils';
import { InputMaxBalanceProps } from './input-money.types';

const InputMaxBalance: FC<InputMaxBalanceProps> = ({
  max,
  data,
  isDNR,
  control,
  isBorrow,
}) => {
  const depositCollateral = useWatch({ control, name: 'borrow.collateral' });
  const repayLoan = useWatch({ control, name: 'repay.loan' });

  const recalculatedMax = useMemo(
    () =>
      isBorrow
        ? calculateDineroLeftToBorrow({
            ...data,
            userCollateral: data.userCollateral.add(
              safeToBigNumber(+depositCollateral || 0, data.collateralDecimals)
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

export default InputMaxBalance;