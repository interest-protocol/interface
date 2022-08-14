import { FC } from 'react';

import { Box, Input } from '@/elements';

import { MAILMarketSearchBarProps } from '../../mail-market.types';

const MAILMarketSearchInput: FC<MAILMarketSearchBarProps> = ({ register }) => (
  <Box bg="foreground" p="L" borderRadius="L" mt="XL" position="relative">
    <Input
      py="L"
      color="text"
      borderRadius="L"
      border="1px solid"
      {...register('search')}
      borderColor="textSecondary"
      placeholder="Search Pool by name, symbol or address..."
      focus={{
        borderColor: 'accent',
      }}
    />
  </Box>
);

export default MAILMarketSearchInput;
