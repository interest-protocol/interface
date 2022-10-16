import { FC, useMemo } from 'react';

import BorrowForm from './components/borrow-form';
import { FormsProps } from './dinero-market.types';
import { getBorrowFields, getRepayFields } from './dinero-market.utils';

const DineroMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  account,
  isGettingData,
  refetch,
}) => {
  const repayFieldsData = useMemo(() => getRepayFields(data), [data]);

  const borrowFieldsData = useMemo(() => getBorrowFields(data), [data]);

  return (
    <>
      {mode === 'borrow' && (
        <BorrowForm
          isBorrow
          data={data}
          account={account}
          isGettingData={isGettingData}
          fields={borrowFieldsData}
          refetch={refetch}
          form={form}
        />
      )}
      {mode === 'repay' && (
        <BorrowForm
          data={data}
          account={account}
          isGettingData={isGettingData}
          fields={repayFieldsData}
          refetch={refetch}
          form={form}
        />
      )}
    </>
  );
};

export default DineroMarketForm;
