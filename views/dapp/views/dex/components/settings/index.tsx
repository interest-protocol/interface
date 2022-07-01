import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Button, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

import Field from './field';
import { SwapSettingsProps } from './settings.types';

const SettingsModal: FC<SwapSettingsProps> = ({
  toggle,
  control,
  setValue,
  register,
}) => {
  const volatility = useWatch({ control, name: 'volatility' });
  return (
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
          step="0.01"
          name="slippage"
          placeholder="25.00"
          label="Slippage tolerance?"
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
          suffix={<Typography variant="normal">minutes</Typography>}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" p="S">
        <Typography
          m="M"
          pt="S"
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          Token Settings
        </Typography>
      </Box>
      <Box py="M" px="L" display="flex" alignItems="center">
        <Typography variant="normal" mr="M">
          Volatility:
        </Typography>
        <Switch
          thin
          defaultValue={volatility}
          options={[
            { value: 'auto', onSelect: () => setValue('volatility', 'auto') },
            {
              value: 'volatile',
              onSelect: () => setValue('volatility', 'volatile'),
            },
            {
              value: 'stable',
              onSelect: () => setValue('volatility', 'stable'),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default SettingsModal;
