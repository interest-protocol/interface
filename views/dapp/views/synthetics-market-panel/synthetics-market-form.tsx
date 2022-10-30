import { FC, useMemo } from 'react';

import SyntForm from './components/synt-form';
import { FormsProps } from './synthetics-market.types';
import { getBurnFields, getMintFields } from './synthetics-market.utils';

const SyntheticsMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  isGettingData,
  refetch,
}) => {
  const mintFieldsData = useMemo(() => getMintFields(data), [data]);

  const burnFieldsData = useMemo(() => getBurnFields(data), [data]);

  return (
    <>
      {mode === 'mint' && (
        <SyntForm
          isMint
          data={data}
          isGettingData={isGettingData}
          fields={mintFieldsData}
          refetch={refetch}
          form={form}
        />
      )}
      {mode === 'burn' && (
        <SyntForm
          data={data}
          isGettingData={isGettingData}
          fields={burnFieldsData}
          refetch={refetch}
          form={form}
        />
      )}
    </>
  );
};

export default SyntheticsMarketForm;
