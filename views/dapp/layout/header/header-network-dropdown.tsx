import { FC } from 'react';

import { ArrowSVG } from '../../../../components/svg';
import { Box, Dropdown } from '../../../../elements';
import { networkOptions } from './header.data';
import { networkOptionsToDropdown } from './header.helpers';

const HeaderNetworkDropdown: FC = () => (
  <Dropdown
    buttonMode
    mode="select"
    defaultValue="binance"
    title="Choice a Network"
    header="Choice a Network:"
    data={networkOptionsToDropdown(networkOptions)}
    suffix={
      <Box display={['none', 'inline-block']} p="M">
        <ArrowSVG height="0.7rem" />
      </Box>
    }
  />
);

export default HeaderNetworkDropdown;
