import { FC } from 'react';
import { v4 } from 'uuid';

import { Box } from '@/elements';

import { DineroVaultInfoProps } from './dinero-vault.types';
import DineroVaultItem from './dinero-vault-footer-item';

const DineroVaultInfo: FC<DineroVaultInfoProps> = ({ items }) => (
  <Box p="1.5rem 2rem">
    {items?.map((item) => (
      <DineroVaultItem {...item} fontSize="0.85rem" key={v4()} />
    ))}
  </Box>
);

export default DineroVaultInfo;
