import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';

import { CurrencyIdentifierProps } from './faucet-form.types';

const CurrencyIdentifier: FC<CurrencyIdentifierProps> = ({
  tokens,
  control,
}) => {
  const tokenAddress = useWatch({ control, name: 'token' });

  console.log(tokens, tokenAddress);

  const symbol = '???';

  const Icon = FAUCET_TOKENS['DEVNET'][0].Icon;

  return (
    <Box display="flex" alignItems="center">
      <Box as="span" display="inline-block" width="1rem">
        <Icon width="100%" maxHeight="1rem" maxWidth="1rem" />
      </Box>
      <Typography variant="normal" ml="M">
        {symbol}
      </Typography>
    </Box>
  );
};

export default CurrencyIdentifier;
