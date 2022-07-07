import { ChangeEvent, FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import Field from './field';
import { SwapSettingsProps } from './settings.types';

const SettingsModal: FC<SwapSettingsProps> = ({
  toggle,
  register,
  setDeadline,
  setSlippage,
}) => (
  <Box
    pb="L"
    zIndex={1}
    color="text"
    bg="foreground"
    minWidth="22rem"
    borderRadius="M"
    position="absolute"
    boxShadow="0 0 0.5rem #0006"
  >
    <Box display="flex" justifyContent="space-between" p="S">
      <Typography
        m="M"
        pt="S"
        fontSize="S"
        variant="normal"
        color="textSecondary"
        textTransform="uppercase"
      >
        Transaction Settings
      </Typography>
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
    <Box px="L">
      <Field
        step="0.1"
        max="30"
        placeholder="0.5"
        label="Slippage tolerance?"
        setRegister={() =>
          register('slippage', {
            onChange: (v: ChangeEvent<HTMLInputElement>) =>
              setSlippage(isNaN(+v.target.value) ? 0 : +v.target.value),
          })
        }
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
        placeholder="5"
        max="30"
        setRegister={() =>
          register('deadline', {
            onChange: (v: ChangeEvent<HTMLInputElement>) =>
              setDeadline(isNaN(+v.target.value) ? 0 : +v.target.value),
          })
        }
        label="Transaction deadline"
        suffix={<Typography variant="normal">minutes</Typography>}
      />
    </Box>
  </Box>
);

export default SettingsModal;
