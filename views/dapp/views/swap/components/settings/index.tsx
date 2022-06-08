import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import Field from './field';
import { SwapSettingsProps } from './settings.types';

const SettingsModal: FC<SwapSettingsProps> = ({ toggle, register }) => (
  <Box
    zIndex={1}
    color="text"
    bg="foreground"
    minWidth="22rem"
    borderRadius="M"
    position="absolute"
    boxShadow="0 0 0.5rem #0006"
  >
    <Box display="flex" justifyContent="flex-end" p="S">
      <Button
        p="S"
        display="flex"
        bg="transparent"
        onClick={toggle}
        variant="secondary"
        alignItems="center"
        justifyContent="center"
        hover={{
          bg: 'background',
        }}
      >
        <TimesSVG width="1.5rem" />
      </Button>
    </Box>
    <Box pb="L" px="L">
      <Field
        label="Slippage tolerance?"
        step="0.01"
        name="slippage"
        placeholder="25.00"
        register={register}
        prefix={
          <Button
            px="M"
            fontSize="S"
            height="100%"
            variant="secondary"
            bg="accent"
            hover={{ bg: 'accent' }}
            active={{ bg: 'accentActive' }}
          >
            Auto
          </Button>
        }
        suffix={<Typography variant="normal">%</Typography>}
      />
      <Field
        step="1"
        name="deadline"
        placeholder="30"
        register={register}
        label="Transação deadline?"
        suffix={<Typography variant="normal">minutos</Typography>}
      />
    </Box>
  </Box>
);

export default SettingsModal;
