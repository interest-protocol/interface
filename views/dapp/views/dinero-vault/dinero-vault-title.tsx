import { FC } from 'react';

import TokenView from '@/components/token-view';
import { Box, Typography } from '@/elements';

import { DineroVaultDetailsTitleProps } from './dinero-vault.types';

const DineroVaultTitle: FC<DineroVaultDetailsTitleProps> = ({
  token1,
  token2,
}) => (
  <Box p="1.5rem 2rem" display="flex">
    <TokenView symbol={token1.symbol} address={token1.address} />
    <Box display="flex" alignItems="center" fontSize="L" mx="M" pb="0.2rem">
      <Typography
        variant="normal"
        as="span"
        height="100%"
        display="flex"
        alignItems="center"
      >
        →
      </Typography>
    </Box>
    <TokenView symbol={token2.symbol} address={token2.address} />
  </Box>
);

export default DineroVaultTitle;
