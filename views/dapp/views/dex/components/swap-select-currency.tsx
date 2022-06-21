import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../dex.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensModal from './swap-tokens-modal';

const SwapSelectCurrency: FC<SwapSelectCurrencyProps> = ({
  tokens,
  fromRight,
  defaultValue,
  onSelectCurrency,
}) => {
  const { control, register } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });

  return (
    <SwapTokensModal
      tokens={tokens}
      control={control}
      fromRight={fromRight}
      defaultValue={defaultValue}
      onSelectCurrency={onSelectCurrency}
      Input={<SwapSearchToken register={register} />}
    />
  );
};

export default SwapSelectCurrency;
