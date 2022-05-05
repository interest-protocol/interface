import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { OpportunitiesCardProps } from './opportunities.types';

const OpportunitiesCard: FC<OpportunitiesCardProps> = ({
  Icon,
  title,
  description,
}) => (
  <Box
    p={['XXL', 'XL']}
    as="article"
    bg="foreground"
    borderRadius="L"
    boxShadow="0px 2px 10px -5px #AEC0EA"
  >
    <Box>
      <Icon width="5rem" />
    </Box>
    <Typography variant="title3" as="h3" my="L">
      {title}
    </Typography>
    <Typography variant="normal" mt="XL" mb="XL">
      {description}
    </Typography>
  </Box>
);

export default OpportunitiesCard;
