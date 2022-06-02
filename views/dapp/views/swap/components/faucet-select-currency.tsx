import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box } from '@/elements';

import { FaucetSelectCurrencyProps } from './faucet.types';
import FaucetSearchToken from './faucet-search-token';
import FaucetTokensDropdown from './faucet-tokens.dropdown';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  local,
  tokens,
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
    <Box display="flex" flexDirection="column" alignItems="stretch">
      <FaucetTokensDropdown
        local={local}
        tokens={tokens}
        control={control}
        defaultValue={defaultValue}
        onSelectCurrency={onSelectCurrency}
        Input={<FaucetSearchToken register={register} />}
      />
    </Box>
  );
};

export default FaucetSelectCurrency;
