import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { VaultFarmDetailsItemProps } from './vault-farm.types';

const VaultFarmDetailsItem: FC<VaultFarmDetailsItemProps> = ({
  title,
  content,
  tip,
}) => (
  <Box
    display="flex"
    flexDirection={['column', 'column', 'column', 'row']}
    justifyContent="space-between"
    mb="0.75rem"
  >
    <Typography variant="normal" display="flex" alignItems="center">
      {tip && (
        <Box
          mr="M"
          as="span"
          cursor="help"
          data-tip={tip}
          display="inline-block"
        >
          <InfoSVG width="1rem" height="1rem" />
        </Box>
      )}
      <Typography
        variant="normal"
        color={'text'}
        fontSize={'1rem'}
        fontWeight="400"
      >
        {title}
      </Typography>
    </Typography>
    <Typography
      variant="normal"
      color={'text'}
      fontSize={'1rem'}
      fontWeight="500"
      pl={['XL', 'XL', 'XL', 'unset']}
    >
      {content}
    </Typography>
  </Box>
);

export default VaultFarmDetailsItem;
