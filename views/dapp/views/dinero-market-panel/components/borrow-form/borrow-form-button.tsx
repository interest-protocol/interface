import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { ApproveButton } from '@/components';
import { Box, Button } from '@/elements';
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
          <Box width="10rem">
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
                fontSize: 'M',
                width: '100%',
              }}
              pageName={GAPage.DineroMarketPanel}
            />
          </Box>
        ) : (!borrowLoan && !borrowCollateral) ||
          (+borrowCollateral === 0 && +borrowLoan === 0) ? (
          <Button
            px="XL"
            bg="disabled"
            fontSize="M"
            borderRadius="M"
            cursor="not-allowed"
            variant="primary"
          >
            {t('dineroMarketAddress.button.default')}
          </Button>
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
        <Button
          variant="primary"
          px="XL"
          bg="disabled"
          fontSize="M"
          borderRadius="M"
          cursor="not-allowed"
        >
          {t('dineroMarketAddress.button.default')}
        </Button>
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
