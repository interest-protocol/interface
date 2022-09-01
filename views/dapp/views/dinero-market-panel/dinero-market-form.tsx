import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

import BorrowForm from './components/borrow-form';
import { FormsProps } from './dinero-market.types';
import { getBorrowFields, getRepayFields } from './dinero-market.utils';

const DineroMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  account,
  isSubmitting,
  isGettingData,
  onSubmitRepay,
  onSubmitBorrow,
  handleAddAllowance,
}) => {
  const t = useTranslations('dinero-market-address');
  const repayFieldsData = useMemo(
    () =>
      getRepayFields(data, t('repayCollateralLabel'), t('repayDineroLabel')),
    [data]
  );

  const borrowFieldsData = useMemo(
    () =>
      getBorrowFields(data, t('borrowCollateralLabel'), t('borrowDineroLabel')),
    [data]
  );

  return (
    <>
      {mode === 'borrow' && (
        <BorrowForm
          isBorrow
          data={data}
          account={account}
          loading={isGettingData}
          onSubmit={onSubmitBorrow}
          fields={borrowFieldsData}
          isSubmitting={isSubmitting}
          handleAddAllowance={handleAddAllowance}
          {...form}
        />
      )}
      {mode === 'repay' && (
        <BorrowForm
          data={data}
          account={account}
          loading={isGettingData}
          onSubmit={onSubmitRepay}
          fields={repayFieldsData}
          isSubmitting={isSubmitting}
          handleAddAllowance={handleAddAllowance}
          {...form}
        />
      )}
    </>
  );
};

export default DineroMarketForm;
