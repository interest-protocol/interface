import { FC, useMemo } from 'react';

import BorrowForm from './components/borrow-form';
import { FormsProps } from './synthetics-market.types';
import { getBorrowFields, getRepayFields } from './synthetics-market.utils';

const SyntheticsMarketForm: FC<FormsProps> = ({
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

export default SyntheticsMarketForm;
