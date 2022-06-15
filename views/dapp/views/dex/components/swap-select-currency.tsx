import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../dex.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensDropdown from './swap-tokens.dropdown';

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
    <SwapTokensDropdown
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
