import { find, pathOr, propEq } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { isValidAccount, safeGetAddress } from '@/utils';

import { CurrencyIdentifierProps } from '../faucet.types';

const CurrencyIdentifier: FC<CurrencyIdentifierProps> = ({
  tokens,
  control,
}) => {
  const tokenAddress = useWatch({ control, name: 'token' });

  const symbol =
    tokenAddress && isValidAccount(tokenAddress)
      ? pathOr(
          TOKEN_SYMBOL.Unknown,
          ['symbol'],
          find(propEq('address', safeGetAddress(tokenAddress)), tokens)
        )
      : TOKEN_SYMBOL.Unknown;

  const Icon = TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" alignItems="center">
      <Box as="span" display="inline-block" width="1rem">
        <Icon width="100%" />
      </Box>
      <Typography variant="normal" ml="M">
        {symbol}
      </Typography>
    </Box>
  );
};

export default CurrencyIdentifier;
