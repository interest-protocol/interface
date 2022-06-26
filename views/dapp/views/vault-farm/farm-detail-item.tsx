import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { VaultFarmDetailsItemProps } from './vault-farm.types';

const VaultFarmDetailsItem: FC<VaultFarmDetailsItemProps> = ({
  title,
  content,
  fontSize,
  color,
}) => (
  <Box display="flex" justifyContent="space-between" mb="0.5rem">
    <Typography
      variant="normal"
      color={color || 'text'}
      fontSize={fontSize || '1rem'}
      fontWeight="500"
    >
      {title}
    </Typography>
    <Typography
      variant="normal"
      color={color || 'text'}
      fontSize={fontSize || '1rem'}
      fontWeight="500"
    >
      {content}
    </Typography>
  </Box>
);

export default VaultFarmDetailsItem;
