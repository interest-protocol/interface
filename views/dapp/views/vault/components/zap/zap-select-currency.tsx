import { FC } from 'react';

import { Box } from '@/elements';

import { ZapSelectCurrencyProps } from './zap.types';
import ZapTokensDropdown from './zap-tokens.dropdown';

const ZapSelectCurrency: FC<ZapSelectCurrencyProps> = ({
  label,
  tokens,
  defaultValue,
  onSelectCurrency,
}) => (
  <Box mt="M">
    {label}
    <Box mt="M" display="flex" flexDirection="column" alignItems="stretch">
      <ZapTokensDropdown
        tokens={tokens}
        defaultValue={defaultValue}
        onSelectCurrency={
          onSelectCurrency as (
            currency: string,
            callback?: (() => void) | undefined
          ) => void
        }
      />
    </Box>
  </Box>
);

export default ZapSelectCurrency;
