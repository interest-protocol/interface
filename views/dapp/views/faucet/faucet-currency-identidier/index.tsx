import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { ERC_20_DATA, TOKENS_SVG_MAP } from '@/constants';
import Box from '@/elements/box';
import { TOKEN_SYMBOL } from '@/sdk';

import { CurrencyIdentifierProps } from '../faucet.types';

const CurrencyIdentifier: FC<CurrencyIdentifierProps> = ({
  control,
  chainId,
}) => {
  const tokenAddress = useWatch({ control, name: 'token' });

  const symbol = pathOr(
    '???',
    [chainId || 0, ethers.utils.getAddress(tokenAddress), 'symbol'],
    ERC_20_DATA
  );

  const Icon = TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" alignItems="center">
      <Box mr="M">
        <Icon width="1rem" />
      </Box>
      {symbol}
    </Box>
  );
};

export default CurrencyIdentifier;
