import { ethers } from 'ethers';
import { head, nth } from 'ramda';
import { FC, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { createMailMarket } from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useGetMailMarketMetadata, useGetSigner } from '@/hooks';
import {
  isSameAddress,
  isZeroAddress,
  shortAccount,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import {
  IMailMarketSearchItemData,
  MAILMarketSearchBarResultsProps,
} from '../../mail-market.types';

const [getIsDeployed, getName, getSymbol, getMarketAddress] = [
  head,
  nth(1),
  nth(2),
  nth(4),
];

const SearchItem: FC<IMailMarketSearchItemData> = ({
  address,
  addLocalAsset,
}) => {
  const { signer, chainId, account } = useGetSigner();

  // handle only in the creating button
  const [createMarketLoading, setCreateMarketLoading] = useState(false);

  const handleCreateMarket = async () => {
    try {
      setCreateMarketLoading(true);
      const { validSigner, validId } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      if (isZeroAddress(address)) return;

      const tx = await createMailMarket(validId, validSigner, address);

      await showTXSuccessToast(tx);
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setCreateMarketLoading(false);
    }
  };

  const createMarket = () =>
    showToast(handleCreateMarket(), {
      loading: 'Creating...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  // data = [isDeployed, name, symbol, token, market address]
  const { data, error } = useGetMailMarketMetadata(address);

  // DO not use the default error page.
  // say failed to fetch market data because the rest of the page should work properly
  // Error message should say make sure the address is a ERC20 token

  if (error) return <div>error</div>;

  if (!data) return <div>loading</div>;

  // nice metadata card with the info
  return (
    <Box
      p="L"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
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
          {`${getName(data)} (${getSymbol(data)})`}
        </Box>
        <Box>
          <Typography variant="normal">{shortAccount(address)}</Typography>
          <Typography variant="normal">
            {shortAccount(getMarketAddress(data) as string)}
          </Typography>
        </Box>
      </Box>
      {getIsDeployed(data) ? (
        <Button
          variant="primary"
          hover={{
            bg: 'accentActive',
          }}
          onClick={() => {
            addLocalAsset({
              market: getMarketAddress(data) as string,
              name: getName(data) as string,
              symbol: getSymbol(data) as string,
              token: address,
            });
            // then route to the mail market page
          }}
        >
          Enter
        </Button>
      ) : (
        <Button
          disabled={createMarketLoading}
          variant="primary"
          onClick={async () => {
            await createMarket();
            addLocalAsset({
              market: getMarketAddress(data) as string,
              name: getName(data) as string,
              symbol: getSymbol(data) as string,
              token: address,
            });
            // route
          }}
        >
          {createMarketLoading ? 'loading' : 'create pool'}
        </Button>
      )}
    </Box>
  );
};

const MAILMarketSearchBarResults: FC<MAILMarketSearchBarResultsProps> = ({
  control,
  allMarkets,
  addLocalAsset,
}) => {
  const query = useWatch({ control, name: 'search' });

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  console.log(trimmedQuery, 'trimmedquery');

  const doesMarketExist = useMemo(
    () =>
      allMarkets.some((market) =>
        ethers.utils.isAddress(trimmedQuery)
          ? isSameAddress(trimmedQuery, market.market) ||
            isSameAddress(trimmedQuery, market.token)
          : market.name.toLowerCase().startsWith(trimmedQuery.toLowerCase()) ||
            market.symbol.toLowerCase().startsWith(trimmedQuery.toLowerCase())
      ),
    [trimmedQuery]
  );

  console.log(doesMarketExist, 'does');

  if (doesMarketExist || !trimmedQuery) return null;

  if (!ethers.utils.isAddress(trimmedQuery))
    return (
      <div>
        Market not found: Please write a token address to find or create a new
        market
      </div>
    );

  return (
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
        addLocalAsset={addLocalAsset}
        address={ethers.utils.getAddress(trimmedQuery)}
      />
    </Box>
  );
};

export default MAILMarketSearchBarResults;
