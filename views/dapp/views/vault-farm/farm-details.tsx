import { FC } from 'react';
import { v4 } from 'uuid';

import { Box } from '@/elements';

import VaultFarmDetailsItem from './farm-detail-item';
import { VaultFarmDetailsProps } from './vault-farm.types';

const VaultFarmDetails: FC<VaultFarmDetailsProps> = ({ version, items }) => (
  <Box p="1.5rem 2rem">
    {items.map(
      (item) =>
        item.version?.includes(version) && (
          <VaultFarmDetailsItem
            title={item.title}
            content={item.content}
            fontSize="0.85rem"
            key={v4()}
          />
        )
    )}
  </Box>
);

export default VaultFarmDetails;
