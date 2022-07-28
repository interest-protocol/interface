import { FC } from 'react';

import { Box } from '@/elements';

import { VaultName } from '../vault/components';
import { VaultNameProps } from '../vault/vault.types';

const VaultFarmTitle: FC<VaultNameProps> = ({ vault, caption, isAuto }) => (
  <Box p="1.5rem 2rem">
    <VaultName vault={vault} isAuto={isAuto} caption={caption} />
  </Box>
);

export default VaultFarmTitle;
