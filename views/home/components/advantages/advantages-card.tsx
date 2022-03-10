import { FC } from 'react';

import { CheckSVG } from '../../../../components/svg';
import { Box, Typography } from '../../../../elements';

const AdvantagesCard: FC = ({ children }) => (
  <Box
    p="L"
    as="article"
    width="100%"
    display="flex"
    borderRadius="L"
    alignItems="center"
    boxShadow="0px 1.5px 10px -5px #AEC0EA"
  >
    <Box>
      <CheckSVG width="1.2rem" />
    </Box>
    <Typography variant="normal" mx="L" fontSize="M">
      {children}
    </Typography>
  </Box>
);

export default AdvantagesCard;
