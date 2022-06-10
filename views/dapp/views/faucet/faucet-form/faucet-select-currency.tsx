import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Typography } from '@/elements';

import {
  FaucetSelectCurrencyForm,
  FaucetSelectCurrencyProps,
} from '../faucet.types';
import FaucetSearchToken from './faucet-search-token';
import FaucetTokensDropdown from './faucet-tokens.dropdown';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  tokens,
  defaultValue,
  addLocalToken,
  onSelectCurrency,
}) => {
  const { control, register } = useForm<FaucetSelectCurrencyForm>({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });
  return (
    <Box my="M">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        {label}:
      </Typography>
      <Box my="M" display="flex" flexDirection="column" alignItems="stretch">
        <FaucetTokensDropdown
          tokens={tokens}
          control={control}
          defaultValue={defaultValue}
          addLocalToken={addLocalToken}
          onSelectCurrency={onSelectCurrency}
          Input={<FaucetSearchToken register={register} />}
        />
      </Box>
    </Box>
  );
};

export default FaucetSelectCurrency;
