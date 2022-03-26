import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { AdvertisingProps } from './advertising.types';

const Advertising: FC<AdvertisingProps> = ({ Icon, lines, title }) => (
  <Box
    width="100vw"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box display="flex" flexDirection="column" alignItems="center">
      {Icon ? <Icon width="6rem" /> : <LogoSVG width="6rem" />}
      <Typography variant="title2" mt="L">
        {title}
      </Typography>
      {lines.map((item) => (
        <Typography variant="normal" mt="M" key={v4()}>
          {item}
        </Typography>
      ))}
    </Box>
  </Box>
);

export default Advertising;
