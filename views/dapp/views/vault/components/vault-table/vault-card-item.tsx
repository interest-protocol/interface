import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { VaultCardItemProps } from '../../vault.types';

const VaultCardItem: FC<VaultCardItemProps> = ({ title, content }) => (
  <Box px="L" display="flex" justifyContent="space-between" mb="0.4rem">
    <Typography
      variant="normal"
      color="textSecondary"
      fontSize="0.9rem"
      fontWeight="400"
    >
      {title}
    </Typography>
    <Typography variant="normal" fontSize="0.9rem" fontWeight="400">
      {content}
    </Typography>
  </Box>
);

export default VaultCardItem;
