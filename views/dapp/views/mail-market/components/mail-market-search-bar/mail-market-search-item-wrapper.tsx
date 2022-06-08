import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { useGetMailMarketMetadata } from '@/hooks';
import { LoadingSVG, TimesSVG } from '@/svg';

import { SearchItemWrapperProps } from '../../mail-market.types';
import SearchItem from './mail-market-search-item';

const SearchItemWrapper: FC<SearchItemWrapperProps> = ({
  address,
  addLocalAsset,
}) => {
  // data = [isDeployed, name, symbol, token, market address]
  const { data, error } = useGetMailMarketMetadata(address);

  if (error)
    return (
      <Box display="flex" alignItems="center" color="error">
        <Box
          width="1.2rem"
          height="1.2rem"
          border="1px solid"
          borderRadius="50%"
          alignItems="center"
          display="inline-flex"
          justifyContent="center"
        >
          <TimesSVG width="1rem" />
        </Box>
        <Box ml="M">
          <Typography variant="normal" fontWeight="600">
            Something went wrong!
          </Typography>
          <Typography variant="normal" fontSize="S" color="textSecondary">
            Make sure the address is a ERC20 token
          </Typography>
        </Box>
      </Box>
    );

  if (!data)
    return (
      <Box display="flex" alignItems="center">
        <LoadingSVG width="1.2rem" />
        <Typography variant="normal" ml="M">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <SearchItem address={address} addLocalAsset={addLocalAsset} data={data} />
  );
};

export default SearchItemWrapper;
