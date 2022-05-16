import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { AdvertisingProps } from './web3-manager.type';

const Advertising: FC<AdvertisingProps> = ({ Icon, lines, title, button }) => (
  <Box
    width="100vw"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box display="flex" flexDirection="column" alignItems="center">
      {Icon ? (
        <Icon width="6rem" height="6rem" />
      ) : (
        <LogoSVG width="6rem" height="6rem" />
      )}
      <Typography variant="title2" mt="L">
        {title}
      </Typography>
      {lines.map((item) => (
        <Typography variant="normal" mt="M" key={v4()}>
          {item}
        </Typography>
      ))}
      {button && (
        <Button
          mt="XL"
          variant="primary"
          onClick={button.action}
          hover={{ bg: 'accentActive' }}
        >
          {button.text}
        </Button>
      )}
    </Box>
  </Box>
);

export default Advertising;
