import { FC } from 'react';

import { Box } from '@/elements';

import { VaultName } from '../vault/components';
import { VaultNameProps } from '../vault/vault.types';

const VaultFarmTitle: FC<VaultNameProps> = ({
  Icons,
  caption,
  name,
  isAuto,
}) => (
  <Box p="1.5rem 2rem">
    <VaultName Icons={Icons} isAuto={isAuto} caption={caption} name={name} />
  </Box>
);

export default VaultFarmTitle;
