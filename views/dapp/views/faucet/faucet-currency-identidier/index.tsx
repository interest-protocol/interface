import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import Box from '@/elements/box';
import { TOKEN_SYMBOL } from '@/sdk';

import { CurrencyIdentifierProps } from '../faucet.types';

const CurrencyIdentifier: FC<CurrencyIdentifierProps> = ({ control }) => {
  const currency = useWatch({ control, name: 'currency' });

  const Icon = TOKENS_SVG_MAP[currency] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" alignItems="center">
      <Box mr="M">
        <Icon width="1rem" />
      </Box>
      {currency}
    </Box>
  );
};

export default CurrencyIdentifier;
