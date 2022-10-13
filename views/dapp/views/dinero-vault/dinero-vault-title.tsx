import { FC } from 'react';

import TokenView from '@/components/token-view';
import { Box } from '@/elements';
import { RightArrowSVG } from '@/svg';

import { DineroVaultDetailsTitleProps } from './dinero-vault.types';

const DineroVaultTitle: FC<DineroVaultDetailsTitleProps> = ({
  token1,
  token2,
}) => (
  <Box py="1.5rem" px=" 2rem" display="flex">
    <TokenView symbol={token1.symbol} address={token1.address} />
    <Box display="flex" alignItems="center" fontSize="L" mx="M" width="0.9rem">
      <RightArrowSVG width="100%" />
    </Box>
    <TokenView symbol={token2.symbol} address={token2.address} />
  </Box>
);

export default DineroVaultTitle;
