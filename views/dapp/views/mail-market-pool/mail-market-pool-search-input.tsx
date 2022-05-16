import { FC } from 'react';

import { Box, Input } from '@/elements';

import { MAILMarketSearchInputProps } from './mail-market-pool.types';

const MAILMarketSearchInput: FC<MAILMarketSearchInputProps> = ({
  register,
}) => (
  <Box bg="foreground" p="L" borderRadius="L" mt="XL">
    <Input
      py="L"
      color="text"
      borderRadius="L"
      border="1px solid"
      {...register('search')}
      borderColor="textSecondary"
      placeholder="Search Token by name, symbol or address..."
    />
  </Box>
);

export default MAILMarketSearchInput;
