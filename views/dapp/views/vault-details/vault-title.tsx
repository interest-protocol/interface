import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { VaultName } from '../vault/components';
import { VaultDetailsProps } from '../vault/vault.types';

const VaultDetailsTitle: FC<VaultDetailsProps> = ({ token1, token2 }) => (
  <Box p="1.5rem 2rem" display="flex">
    <VaultName symbol={token1.symbol} address={token1.address} />
    <Box display="flex" alignItems="center" fontSize="L" mx="M">
      <Typography variant="normal" as="span" pb="S">
        →
      </Typography>
    </Box>
    <VaultName symbol={token2.symbol} address={token2.address} />
  </Box>
);

export default VaultDetailsTitle;
