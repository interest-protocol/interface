import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { InfoSVG } from '@/svg';
import {
  getBorrowPositionHealthData,
  getRepayPositionHealthData,
} from '@/utils/dinero-market';

import { BorrowFormLoanInfoProps } from './borrow-form.types';

const INFO = [
  {
    text: 'Estimated DNR borrowed',
    tip: 'Total amount of DNR owed (principal + interest<br /> rate) including the planned transaction',
  },
  {
    text: 'Estimated Liquidation Price',
    tip: 'If the collateral token drops to this price,<br /> you are at risk of liquidation.',
  },
  {
    text: 'Position Health',
    tip: 'If this value reaches 0, you are at risk of<br /> liquidation.',
  },
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
      {INFO.map(({ text, tip }, i) => (
        <Box key={v4()} display="flex" justifyContent="space-between" p="M">
          <Box display="flex" alignItems="center">
            <Box
              mr="M"
              cursor="help"
              display="flex"
              data-tip={tip}
              alignItems="center"
            >
              <InfoSVG width="1rem" height="1rem" />
            </Box>
            <Typography variant="normal" as="span">
              {text}
            </Typography>
          </Box>
          <Typography
            as="span"
            variant="normal"
            textAlign="right"
            whiteSpace="nowrap"
          >
            {loanData[i]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BorrowFormLoanInfo;
