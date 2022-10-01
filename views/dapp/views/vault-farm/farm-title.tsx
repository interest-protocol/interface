import { FC } from 'react';

import { Box } from '@/elements';

import { VaultName } from '../vault/components';
import { VaultDetailsProps } from '../vault/vault.types';

const VaultFarmTitle: FC<VaultDetailsProps> = ({ vaults }) => (
  <Box p="1.5rem 2rem" display="flex">
    <VaultName vault={vaults[0].vault} />
    <Box display="flex" alignItems="center" fontSize="L" pb="M" mx="M">
      →
    </Box>
    <VaultName vault={vaults[1].vault} />
  </Box>
);

export default VaultFarmTitle;
