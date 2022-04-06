import { FC, useMemo } from 'react';

import { TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { getBorrowFields, getRepayFields } from '@/utils/dinero-market';

import BorrowForm from './components/borrow-form';
import { FormsProps } from './dinero-market.types';

const DineroMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  currency,
  isSubmitting,
  isGettingData,
  onSubmitRepay,
  onSubmitBorrow,
  handleAddAllowance,
}) => {
  const repayFieldsData = useMemo(
    () => getRepayFields(data, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  const borrowFieldsData = useMemo(
    () => getBorrowFields(data!, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  return (
    <>
      {mode === 'borrow' && (
        <BorrowForm
          isBorrow
          data={data}
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
