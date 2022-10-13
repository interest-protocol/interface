import { FC } from 'react';
import { v4 } from 'uuid';

import { Box } from '@/elements';

import { DineroVaultInfoProps } from './dinero-vault.types';
import DineroVaultItem from './dinero-vault-footer-item';

const DineroVaultInfo: FC<DineroVaultInfoProps> = ({ items }) => (
  <Box p="1.5rem 2rem">
    {items?.map((item) => (
      <Box key={v4()} mb="0.75rem">
        <DineroVaultItem {...item} fontSize="0.85rem" />
      </Box>
    ))}
  </Box>
);

export default DineroVaultInfo;
