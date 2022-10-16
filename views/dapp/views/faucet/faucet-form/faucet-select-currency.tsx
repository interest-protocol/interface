import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { FaucetSelectCurrencyProps } from '../faucet.types';
import FaucetTokensDropdown from './faucet-tokens-dropdown';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  tokens,
  defaultValue,
  onSelectCurrency,
}) => {
  const t = useTranslations();
  return (
    <Box my="M">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        {label + t('special.colon')}
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
};

export default FaucetSelectCurrency;
