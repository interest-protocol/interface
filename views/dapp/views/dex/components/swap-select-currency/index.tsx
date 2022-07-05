import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../../dex.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensModal from './swap-tokens-modal';

const SwapSelectCurrency: FC<SwapSelectCurrencyProps> = (props) => {
  const { control, register } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });

  return (
    <SwapTokensModal
      {...props}
      control={control}
      Input={<SwapSearchToken register={register} />}
    />
  );
};

export default SwapSelectCurrency;
