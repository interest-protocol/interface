import { FC, useState } from 'react';

import { Switch } from '@/components';
import { Box } from '@/elements';

import { getSwitchDefaultData } from './vault-farm.helpers';

const ButtonTabSelect: FC = () => {
  const [select, setSelect] = useState('Stake');
  const SWITCH_DEFAULT_DATA = getSwitchDefaultData(setSelect);

  return (
    <Box
      bg="foreground"
      py="L"
      display="flex"
      justifyContent="center"
      borderTopLeftRadius="M"
      borderTopRightRadius="M"
    >
      <Switch defaultValue={select} options={SWITCH_DEFAULT_DATA['farm']} />
    </Box>
  );
};

export default ButtonTabSelect;
