import { FC } from 'react';

import { Box, Dropdown } from '@/elements';

const TVLSelect: FC = () => (
  <Box
    bg="foreground"
    height="3rem"
    width="10rem"
    display="flex"
    alignItems="center"
    px="L"
    borderRadius="M"
  >
    <Dropdown
      mode="select"
      data={[
        {
          value: 'default',
          displayOption: 'Default',
        },
        {
          value: 'lp',
          displayOption: 'LP',
        },
        {
          value: 'tvl',
          displayOption: 'TVL',
        },
      ]}
      title={'Default'}
      defaultValue={'Default'}
    />
  </Box>
);

export default TVLSelect;
