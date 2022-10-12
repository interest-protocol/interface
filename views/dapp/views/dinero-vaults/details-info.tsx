import { FC } from 'react';
import { v4 } from 'uuid';

import { Box } from '@/elements';

import { DineroVaultDetailsInfoProps } from './dinero-vaults.types';
import DineroVaultDetailsItem from './dinero-vaults-footer-item';

const DineroVaultDetailsInfo: FC<DineroVaultDetailsInfoProps> = ({ items }) => (
  <Box p="1.5rem 2rem">
    {items?.map((item) => (
      <DineroVaultDetailsItem {...item} fontSize="0.85rem" key={v4()} />
    ))}
  </Box>
);

export default DineroVaultDetailsInfo;
