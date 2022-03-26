/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import { SwitchProps } from './switch.types';

const Switch: FC<SwitchProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState(defaultValue);

  const switcher = (value: string) => () => setSelected(value);

  return (
    <Box
      p="S"
      height="3rem"
      bg="background"
      display="inline-flex"
      borderRadius="1.5rem"
    >
      {options.map(({ value, onSelect }) => (
        <Typography
          py="M"
          px="XL"
          key={v4()}
          display="flex"
          variant="normal"
          cursor="pointer"
          alignItems="center"
          borderRadius="1.5rem"
          justifyContent="center"
          hover={{ color: 'text' }}
          textTransform="capitalize"
          color={value === selected ? 'outline' : 'textSecondary'}
          onClick={() => {
            if (value !== selected) {
              switcher(value);
              onSelect?.();
            }
          }}
          bg={value === selected ? 'bottomBackground' : 'transparent'}
        >
          {value}
        </Typography>
      ))}
    </Box>
  );
};
export default Switch;
