import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { getPositionHealthData } from '@/utils/dinero-market';

import { BorrowFormLoanInfoProps } from './borrow-form.types';

const INFO = [
  'Expected DNR borrowed',
  'Expected Liquidation Price',
  'Position Health',
];

const BorrowFormLoanInfo: FC<BorrowFormLoanInfoProps> = ({ control, data }) => {
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  const borrowCollateral = useWatch({
    control,
    name: 'borrow.collateral',
  });

  const loanData = useMemo(
    () =>
      getPositionHealthData(data, {
        collateral: borrowCollateral || '0',
        loan: borrowLoan || '0',
      }),
    [data, borrowCollateral, borrowLoan]
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
