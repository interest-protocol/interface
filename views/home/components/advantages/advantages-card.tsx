import { FC } from 'react';

import { CheckSVG } from '../../../../components/svg';
import { Box, Typography } from '../../../../elements';
import { AdvantagesCardProps } from './advantages.types';

const AdvantagesCard: FC<AdvantagesCardProps> = ({ link, description }) => (
  <a href={link} target="__blank">
    <Box
      p="L"
      as="article"
      width="100%"
      height="5rem"
      display="flex"
      borderRadius="L"
      alignItems="center"
      boxShadow="0px 1.5px 10px -5px #AEC0EA"
    >
      <Box>
        <CheckSVG width="1.2rem" />
      </Box>
      <Typography variant="normal" mx="L" fontSize="M">
        {description}
      </Typography>
    </Box>
  </a>
);

export default AdvantagesCard;
