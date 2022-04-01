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
  isGettingData,
  onSubmitRepay,
  onSubmitBorrow,
  handleAddAllowance,
}) => {
  const formState = form.getValues();

  const repayFieldsData = useMemo(
    () => getRepayFields(data, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  const borrowFieldsData = useMemo(
    () =>
      getBorrowFields(
        data!,
        currency as TOKEN_SYMBOL,
        formState.borrow.collateral
      ),
    [data, currency, formState.borrow.collateral]
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
          handleAddAllowance={handleAddAllowance}
          {...form}
        />
      )}
      {mode === 'repay' && (
        <BorrowForm
          loading={isGettingData}
          onSubmit={onSubmitRepay}
          fields={repayFieldsData}
          handleAddAllowance={handleAddAllowance}
          data={data}
          {...form}
        />
      )}
    </>
  );
};

export default DineroMarketForm;
