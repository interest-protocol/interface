import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Typography } from '@/elements';

import { FaucetSelectCurrencyProps } from './faucet.types';
import FaucetSearchToken from './faucet-search-token';
import FaucetTokensDropdown from './faucet-tokens.dropdown';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  addLocalToken,
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
          addLocalToken={addLocalToken}
          tokens={tokens}
          control={control}
          defaultValue={defaultValue}
          onSelectCurrency={onSelectCurrency}
          Input={<FaucetSearchToken register={register} />}
        />
      </Box>
    </Box>
  );
};

export default FaucetSelectCurrency;
