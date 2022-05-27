import { FC } from 'react';

import { Box, Input } from '@/elements';

import { MAILMarketSearchBarProps } from '../../mail-market.types';
import MAILMarketSearchBarResults from './mail-market-search-bar-results';

const MAILMarketSearchInput: FC<MAILMarketSearchBarProps> = ({
  control,
  register,
  localAssets,
  setLocalAssets,
}) => (
  <Box bg="foreground" p="L" borderRadius="L" mt="XL" position="relative">
    <Input
      py="L"
      color="text"
      borderRadius="L"
      border="1px solid"
      {...register('search')}
      borderColor="textSecondary"
      placeholder="Search Pool by name, symbol or address..."
    />
    <MAILMarketSearchBarResults
      control={control}
      localAssets={localAssets}
      setLocalAssets={setLocalAssets}
    />
  </Box>
);

export default MAILMarketSearchInput;
