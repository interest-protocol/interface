import { FC, useMemo } from 'react';

import SyntForm from './components/synt-form';
import { FormsProps } from './synthetics-market-panel.types';
import { getBurnFields, getMintFields } from './synthetics-market-panel.utils';

const SyntheticsMarketForm: FC<FormsProps> = ({
  mode,
  data,
  form,
  isGettingData,
  refetch,
  mintButton,
  burnButton,
}) => {
  const mintFieldsData = useMemo(() => getMintFields(data), [data]);

  const burnFieldsData = useMemo(() => getBurnFields(data), [data]);

  return (
    <>
      {mode === 'mint' && (
        <SyntForm
          isMint
          data={data}
          form={form}
          refetch={refetch}
          fields={mintFieldsData}
          mintButton={mintButton}
          burnButton={burnButton}
          isGettingData={isGettingData}
        />
      )}
      {mode === 'burn' && (
        <SyntForm
          data={data}
          form={form}
          refetch={refetch}
          fields={burnFieldsData}
          mintButton={mintButton}
          burnButton={burnButton}
          isGettingData={isGettingData}
        />
      )}
    </>
  );
};

export default SyntheticsMarketForm;
