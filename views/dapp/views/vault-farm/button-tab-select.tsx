import { FC } from 'react';

import { Switch } from '@/components';
import { Box } from '@/elements';

import { StateProps } from '../vault/vault.types';
import { getSwitchDefaultData } from './vault-farm.helpers';

const ButtonTabSelect: FC<StateProps> = ({ state, setState }) => {
  const SWITCH_DEFAULT_DATA = getSwitchDefaultData(setState);

  return (
    <Box
      bg="foreground"
      py="L"
      display="flex"
      justifyContent="center"
      borderTopLeftRadius="M"
      borderTopRightRadius="M"
    >
      <Switch defaultValue={state} options={SWITCH_DEFAULT_DATA['farm']} />
    </Box>
  );
};

export default ButtonTabSelect;
