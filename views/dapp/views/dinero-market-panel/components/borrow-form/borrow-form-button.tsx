import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { ApproveButton } from '@/components';
import { Box } from '@/elements';
import { isValidAccount, isZeroAddress } from '@/utils';
import { GAPage } from '@/utils/analytics';

import BorrowButton from './borrow-button';
import { BorrowFormButtonProps } from './borrow-form.types';
import RepayButton from './repay-button';

const BorrowFormButton: FC<BorrowFormButtonProps> = ({
  data,
  isBorrow,
  account,
  refetch,
  form,
}) => {
  const t = useTranslations();
  const repayLoan = useWatch({ control: form.control, name: 'repay.loan' });
  const repayCollateral = useWatch({
    control: form.control,
    name: 'repay.collateral',
  });
  const borrowLoan = useWatch({ control: form.control, name: 'borrow.loan' });
  const borrowCollateral = useWatch({
    control: form.control,
    name: 'borrow.collateral',
  });

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isBorrow ? (
        data.collateralAllowance.isZero() ? (
          <ApproveButton
            enabled={
              data.collateralAllowance.isZero() &&
              isValidAccount(account) &&
              !isZeroAddress(data.marketAddress)
            }
            refetch={refetch}
            chainId={data.chainId}
            contract={data.collateralAddress}
            spender={data.marketAddress}
            buttonProps={{
              display: 'flex',
              variant: 'primary',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            pageName={GAPage.DineroMarketPanel}
          />
        ) : (!borrowLoan && !borrowCollateral) ||
          (+borrowCollateral === 0 && +borrowLoan === 0) ? (
          <Box
            py="L"
            px="XL"
            fontSize="S"
            bg="disabled"
            borderRadius="M"
            cursor="not-allowed"
          >
            {t('dineroMarketAddress.button.default')}
          </Box>
        ) : (
          <BorrowButton
            borrowLoan={borrowLoan}
            borrowCollateral={borrowCollateral}
            refetch={refetch}
            form={form}
            data={data}
            account={account}
          />
        )
      ) : !+repayLoan && !+repayCollateral ? (
        <Box
          py="L"
          px="XL"
          fontSize="S"
          bg="disabled"
          borderRadius="M"
          cursor="not-allowed"
        >
          {t('dineroMarketAddress.button.default')}
        </Box>
      ) : (
        <RepayButton
          repayLoan={repayLoan}
          repayCollateral={repayCollateral}
          refetch={refetch}
          form={form}
          data={data}
          account={account}
        />
      )}
    </Box>
  );
};

export default BorrowFormButton;
