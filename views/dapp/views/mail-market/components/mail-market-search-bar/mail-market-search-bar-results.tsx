import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { head, nth, prop } from 'ramda';
import { FC, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { createMailMarket } from '@/api';
import { CopyToClipboard } from '@/components';
import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useGetMailMarketMetadata, useGetSigner } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { LoadingSVG, TimesSVG } from '@/svg';
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
  MAILMarketSearchBarResultsProps,
  SearchItemProps,
  SearchItemWrapperProps,
} from '../../mail-market.types';

const [getIsDeployed, getName, getSymbol, getMarketAddress] = [
  head,
  nth(1),
  nth(2),
  nth(4),
];

const SearchItem: FC<SearchItemProps> = ({ address, addLocalAsset, data }) => {
  const { push } = useRouter();
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
      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setCreateMarketLoading(false);
    }
  };

  const createMarket = async (callback: () => void) =>
    showToast(handleCreateMarket(), {
      loading: 'Creating...',
      success: () => {
        callback();
        return 'Success!';
      },
      error: prop('message'),
    });

  const handleClick = () => {
    addLocalAsset({
      market: getMarketAddress(data) as string,
      name: getName(data) as string,
      symbol: getSymbol(data) as string,
      token: address,
    });
    push(
      {
        pathname: Routes[RoutesEnum.MAILMarketPool],
        query: { pool: getMarketAddress(data) as string },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleCreateToken = async () => createMarket(handleClick);

  const SVG =
    TOKENS_SVG_MAP[getSymbol(data) as string] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box
      p="L"
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box
          mr="L"
          width="2rem"
          height="2rem"
          display="flex"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
        >
          <SVG width="2rem" />
        </Box>
        <Box>
          <Typography variant="normal" fontWeight="800">{`${getName(
            data
          )} (${getSymbol(data)})`}</Typography>
          <Box display="flex" alignItems="center" my="S">
            <Typography
              mr="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Token Address:
            </Typography>
            <Typography variant="normal">{shortAccount(address)}</Typography>
            <CopyToClipboard ml="M" address={address} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              mr="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Market Address:
            </Typography>
            <Typography variant="normal">
              {shortAccount(getMarketAddress(data) as string)}
            </Typography>
            <CopyToClipboard
              ml="M"
              address={getMarketAddress(data) as string}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={['XL', 'XL', 'XL', 'NONE']}
        mx={['auto', 'auto', 'auto', 'NONE']}
      >
        {getIsDeployed(data) ? (
          <Button
            variant="primary"
            hover={{
              bg: 'accentActive',
            }}
            onClick={handleClick}
          >
            Enter
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleCreateToken}
            disabled={createMarketLoading}
            bg={createMarketLoading ? 'disabled' : 'accent'}
          >
            {createMarketLoading ? (
              <Box display="flex">
                <LoadingSVG width="1rem" />
                <Typography ml="M" variant="normal">
                  Creating
                </Typography>
              </Box>
            ) : (
              'Create pool'
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
};

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

const MAILMarketSearchBarResults: FC<MAILMarketSearchBarResultsProps> = ({
  control,
  allMarkets,
  addLocalAsset,
}) => {
  const query = useWatch({ control, name: 'search' });

  const trimmedQuery = useMemo(() => query.trim(), [query]);

  const doesMarketExist = useMemo(
    () =>
      allMarkets.some((market) =>
        ethers.utils.isAddress(trimmedQuery)
          ? isSameAddress(trimmedQuery, market.market) ||
            isSameAddress(trimmedQuery, market.token)
          : market.name.toLowerCase().startsWith(trimmedQuery.toLowerCase()) ||
            market.symbol
              .toLowerCase()
              .startsWith(trimmedQuery.toLowerCase()) ||
            market.symbol.toLowerCase().includes(query.trim().toLowerCase()) ||
            market.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [trimmedQuery, allMarkets]
  );

  if (doesMarketExist || !trimmedQuery) return null;

  if (!ethers.utils.isAddress(trimmedQuery))
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
        Market not found: Please write a token address to find or create a new
        market
      </Box>
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
      <SearchItemWrapper
        addLocalAsset={addLocalAsset}
        address={ethers.utils.getAddress(trimmedQuery)}
      />
    </Box>
  );
};

export default MAILMarketSearchBarResults;
