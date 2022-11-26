import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { syntheticsFormValidation } from './synthetics-form.validator';
import { SYNT_FORM_DEFAULT_VALUES } from './synthetics-market-panel.data';
import {
  ISyntheticForm,
  SyntheticsMarketPanelProps,
} from './synthetics-market-panel.types';
import SyntheticsMarketPanelNormal from './synthetics-market-panel-normal';
import SyntheticsMarketPanelRedStone from './synthetics-market-panel-red-stone';

const SyntheticsMarketPanel: FC<SyntheticsMarketPanelProps> = ({
  mode,
  address,
}) => {
  const form = useForm<ISyntheticForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: SYNT_FORM_DEFAULT_VALUES,
    resolver: yupResolver(syntheticsFormValidation),
  });

  if (false)
    return (
      <SyntheticsMarketPanelRedStone
        mode={mode}
        form={form}
        address={address}
      />
    );

  return (
    <SyntheticsMarketPanelNormal mode={mode} address={address} form={form} />
  );
};

export default SyntheticsMarketPanel;
