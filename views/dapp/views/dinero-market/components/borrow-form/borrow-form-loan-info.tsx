import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import {
  getBorrowPositionHealthData,
  getRepayPositionHealthData,
} from '@/utils/dinero-market';

import { BorrowFormLoanInfoProps } from './borrow-form.types';

const INFO = [
  'Expected DNR borrowed',
  'Expected Liquidation Price',
  'Position Health',
];

const BorrowFormLoanInfo: FC<BorrowFormLoanInfoProps> = ({
  control,
  data,
  isBorrow,
}) => {
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  const borrowCollateral = useWatch({
    control,
    name: 'borrow.collateral',
  });

  const repayLoan = useWatch({ control, name: 'repay.loan' });
  const repayCollateral = useWatch({
    control,
    name: 'repay.collateral',
  });

  const loanData = useMemo(
    () =>
      isBorrow
        ? getBorrowPositionHealthData(data, {
            collateral: borrowCollateral || '0',
            loan: borrowLoan || '0',
          })
        : getRepayPositionHealthData(data, {
            collateral: repayCollateral || '0',
            loan: repayLoan || '0',
          }),
    [data, borrowCollateral, borrowLoan, isBorrow, repayLoan, repayCollateral]
  );
  return (
    <Box mt="XXL">
      {INFO.map((x, i) => (
        <Box key={v4()} display="flex" justifyContent="space-between" p="M">
          <Typography variant="normal" as="span">
            {x}
          </Typography>
          <Typography variant="normal" as="span">
            {loanData[i]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BorrowFormLoanInfo;
