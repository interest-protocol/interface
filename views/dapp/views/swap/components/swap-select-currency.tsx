import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Typography } from '@/elements';

import { SwapSelectCurrencyProps } from './swap.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensDropdown from './swap-tokens.dropdown';

const SwapSelectCurrency: FC<SwapSelectCurrencyProps> = ({
  local,
  label,
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
    <Box display="flex" flexDirection="column" alignItems="stretch" width="48%">
      {label && (
        <Typography
          as="label"
          fontSize="S"
          variant="normal"
          display="inline-block"
        >
          {label}:
        </Typography>
      )}
      <SwapTokensDropdown
        local={local}
        tokens={tokens}
        control={control}
        defaultValue={defaultValue}
        onSelectCurrency={onSelectCurrency}
        Input={<SwapSearchToken register={register} />}
      />
    </Box>
  );
};

export default SwapSelectCurrency;
