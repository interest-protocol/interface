import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { capitalize } from '@/utils';

import { FaucetSelectCurrencyProps } from './faucet-form.types';
import FaucetTokensDropdown from './faucet-tokens-dropdown';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  tokens,
  defaultValue,
  onSelectCurrency,
}) => (
  <Box my="M">
    <Typography
      as="label"
      fontSize="1rem"
      variant="normal"
      display="inline-block"
    >
      {capitalize(label)}:
    </Typography>
    <Box my="M" display="flex" flexDirection="column" alignItems="stretch">
      <FaucetTokensDropdown
        tokens={tokens}
        defaultValue={defaultValue}
        onSelectCurrency={onSelectCurrency}
      />
    </Box>
  </Box>
);

export default FaucetSelectCurrency;
