import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import {
  getBorrowPositionHealthData,
  getRepayPositionHealthData,
} from '../../dinero-market.utils';
import { BorrowFormLoanInfoProps } from './borrow-form.types';

const INFO = [1, 2, 3, 4].map((item) => ({
  text: 'dineroMarketAddress.borrowFormLoanInfoText' + item,
  tip: 'dineroMarketAddress.borrowFormLoanInfoTip' + item,
}));

const BorrowFormLoanInfo: FC<BorrowFormLoanInfoProps> = ({
  control,
  data,
  isBorrow,
}) => {
  const t = useTranslations();
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
              width="1rem"
              cursor="help"
              display="flex"
              data-tip={capitalize(t(tip))}
              minWidth="1rem"
              alignItems="center"
            >
              <InfoSVG width="100%" />
            </Box>
            <Typography variant="normal" as="span">
              {capitalize(t(text))}
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
