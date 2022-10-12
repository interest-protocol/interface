import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import TokenView from '@/components/token-view';
import { Box, Typography } from '@/elements';

import { DineroVaultDetailsTitleProps } from './dinero-vaults.types';

const DineroVaultDetailsTitle: FC<DineroVaultDetailsTitleProps> = ({
  token1,
  token2,
  isLoading,
}) =>
  !isLoading ? (
    <Box p="1.5rem 2rem" display="flex !important">
      <TokenView symbol={token1.symbol} address={token1.address} />
      <Box display="flex" alignItems="center" fontSize="L" mx="M">
        <Typography variant="normal" as="span" pb="S">
          →
        </Typography>
      </Box>
      <TokenView symbol={token2.symbol} address={token2.address} />
    </Box>
  ) : (
    <Box width="50%" p="1.5rem 2rem">
      <Skeleton />
    </Box>
  );

export default DineroVaultDetailsTitle;
