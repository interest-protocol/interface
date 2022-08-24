import { FC, useMemo } from 'react';

import BorrowForm from './components/borrow-form';
import {
  getBorrowFields,
  getRepayFields,
} from './components/borrow-form/borrow-form.utils';
import { FormsProps } from './dinero-market.types';

const DineroMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  isPair,
  account,
  symbols,
  isSubmitting,
  isGettingData,
  onSubmitRepay,
  onSubmitBorrow,
  handleAddAllowance,
}) => {
  const repayFieldsData = useMemo(() => getRepayFields(data, symbols), [data]);

  const borrowFieldsData = useMemo(
    () => getBorrowFields(data, symbols),
    [data]
  );

  return (
    <>
      {mode === 'borrow' && (
        <BorrowForm
          isBorrow
          data={data}
          isPair={isPair}
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
          isPair={isPair}
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
