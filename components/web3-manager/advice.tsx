import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { AdviceProps } from './web3-manager.type';

const Advice: FC<AdviceProps> = ({ Icon, lines, title, buttons }) => (
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
      <Box display="flex" flexDirection="column">
        {buttons?.map(({ action, text }) => (
          <Button
            key={v4()}
            mt="XL"
            onClick={action}
            variant="primary"
            hover={{ bg: 'accentActive' }}
          >
            {text}
          </Button>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Advice;
