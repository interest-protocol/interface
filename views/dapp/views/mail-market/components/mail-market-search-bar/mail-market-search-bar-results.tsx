import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { isValidAccount, shortAccount } from '@/utils';

import {
  IMailMarketSearchItemData,
  MAILMarketSearchBarResultsProps,
} from '../../mail-market.types';

const SearchItem: FC<IMailMarketSearchItemData> = ({
  name,
  symbol,
  address,
  existent,
  localAssets,
  setLocalAssets,
}) => (
  <Box p="L" display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" alignItems="center">
      <Box
        mr="L"
        width="2rem"
        bg="warning"
        height="2rem"
        display="flex"
        fontWeight="800"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        ?
      </Box>
      <Box>
        <Typography variant="normal">
          {name} ({symbol})
        </Typography>
        <Typography variant="normal">{shortAccount(address)}</Typography>
      </Box>
    </Box>
    {existent ? (
      <Button
        variant="primary"
        hover={{
          bg: 'accentActive',
        }}
        onClick={() =>
          localAssets.some((localAsset) => localAsset.address === address)
            ? setLocalAssets(
                localAssets.filter(
                  (localAsset) => localAsset.address !== address
                )
              )
            : setLocalAssets([
                ...localAssets,
                {
                  name,
                  symbol,
                  address,
                },
              ])
        }
      >
        {localAssets.some((localAsset) => localAsset.address === address)
          ? 'Remove'
          : 'Add'}
      </Button>
    ) : (
      <Button variant="primary">Create Pool</Button>
    )}
  </Box>
);

const MAILMarketSearchBarResults: FC<MAILMarketSearchBarResultsProps> = ({
  control,
  localAssets,
  setLocalAssets,
}) => {
  const query = useWatch({ control, name: 'search' });

  const searchResults = useMemo(
    () => ({
      address: query,
      name: '???',
      symbol: '???',
    }),
    [query]
  );

  return query && isValidAccount(query) ? (
    <Box
      p="XL"
      left="0"
      top="5.5rem"
      zIndex={1}
      width="100%"
      boxShadow="0 0 0.6rem #0003"
      bg="foreground"
      borderRadius="L"
      position="absolute"
    >
      <SearchItem
        localAssets={localAssets}
        existent={!!searchResults}
        setLocalAssets={setLocalAssets}
        {...searchResults}
      />
    </Box>
  ) : null;
};

export default MAILMarketSearchBarResults;
