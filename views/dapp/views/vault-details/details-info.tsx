import { FC } from 'react';
import { v4 } from 'uuid';

import { Box } from '@/elements';

import VaultDetailsItem from './detail-item';
import { VaultDetailsInfoProps } from './vault-details.types';

const VaultDetailsInfo: FC<VaultDetailsInfoProps> = ({ items }) => (
  <Box p="1.5rem 2rem">
    {items?.map((item) => (
      <VaultDetailsItem {...item} fontSize="0.85rem" key={v4()} />
    ))}
  </Box>
);

export default VaultDetailsInfo;
