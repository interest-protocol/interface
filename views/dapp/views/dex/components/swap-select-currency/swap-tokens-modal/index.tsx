import { isAddress } from 'ethers/lib/utils';
import { prop } from 'ramda';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { getInterestDEXViewERC20Metadata } from '@/api';
import { Switch } from '@/components';
import {
  NATIVE_TOKENS,
  SWAP_BASES,
  TOKEN_META_DATA_ARRAY,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useDebounce, useIdAccount, useLocalStorage } from '@/hooks';
import { TOKEN_SYMBOL, ZERO_ADDRESS } from '@/sdk';
import { LineLoaderSVG, TimesSVG } from '@/svg';
import { isSameAddress, isSameAddressZ } from '@/utils';

import {
  SwapCurrencyDropdownProps,
  SwapTokenModalMetadata,
} from '../../../dex.types';
import { OnSelectCurrencyData } from '../../../swap/swap.types';

const renderData = (
  tokens: ReadonlyArray<SwapTokenModalMetadata>,
  onSelectCurrency: (data: OnSelectCurrencyData) => void,
  isLocal: boolean,
  currentToken: string,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeUserToken: (address: string) => void = () => {}
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens.map(({ address, symbol, decimals }) => {
    const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;

    const isDisabled = isSameAddressZ(address, currentToken);
    const handleSelectCurrency = () =>
      isDisabled ? {} : onSelectCurrency({ address, symbol, decimals });

    return (
      <Box
        m="XS"
        px="M"
        py="S"
        key={v4()}
        color="text"
        display="flex"
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        borderRadius="M"
        border="1px solid"
        alignItems="center"
        bg={isDisabled ? 'disabled' : 'bottomBackground'}
        borderColor="transparent"
        justifyContent="space-between"
        onClick={handleSelectCurrency}
        hover={{
          borderColor: isDisabled ? 'transparent' : 'accent',
        }}
      >
        <Box my="M" display="flex" alignItems="center">
          <Box as="span" display="inline-block" width="1rem">
            <SVG width="100%" />
          </Box>
          <Typography mx="M" as="span" variant="normal">
            {symbol?.toUpperCase()}
          </Typography>
        </Box>
        {isLocal && (
          <Box
            width="1rem"
            height="1rem"
            color="error"
            display="flex"
            borderRadius="S"
            alignItems="center"
            border="0.5px solid"
            justifyContent="center"
            hover={{
              bg: 'error',
              color: 'text',
              border: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation();
              removeUserToken(address);
            }}
          >
            <TimesSVG width="100%" />
          </Box>
        )}
      </Box>
    );
  });
};

const SwapCurrencyDropdown: FC<SwapCurrencyDropdownProps> = ({
  Input,
  control,
  isSearching,
  toggleModal,
  isModalOpen,
  currentToken,
  setIsSearching,
  onSelectCurrency,
}) => {
  const { chainId } = useIdAccount();
  const [showLocal, setShowLocal] = useState(false);
  const search = useWatch({ control, name: 'search' });
  const [searchedToken, setSearchedToken] =
    useState<null | SwapTokenModalMetadata>(null);
  const [tokensAddedByUser, handleTokensAddedByUser] = useLocalStorage<
    ReadonlyArray<SwapTokenModalMetadata>
  >(`${chainId}-interest-dex-custom-tokens`, []);

  const nativeToken = NATIVE_TOKENS[chainId];

  const debouncedSearch = useDebounce(search, 800);

  const tokenMetaDataArray = TOKEN_META_DATA_ARRAY[chainId];

  // is searching debounce
  useEffect(() => {
    if (isSearching || !debouncedSearch) return;
    const parsedDebouncedSearch = debouncedSearch.trim().toLowerCase();
    const allTokens = tokensAddedByUser.concat(tokenMetaDataArray);
    if (!isAddress(parsedDebouncedSearch)) {
      const token = allTokens.find(
        ({ symbol, name }) =>
          symbol.toLowerCase().startsWith(parsedDebouncedSearch) ||
          name.toLowerCase().startsWith(parsedDebouncedSearch) ||
          name.toLowerCase().includes(parsedDebouncedSearch) ||
          symbol.toLowerCase().includes(parsedDebouncedSearch)
      );

      setSearchedToken(token ? token : null);
      return;
    }

    if (isAddress(parsedDebouncedSearch)) {
      const token = allTokens.find(({ address }) =>
        isSameAddress(parsedDebouncedSearch, address)
      );

      if (token) {
        setSearchedToken(token);
        return;
      }

      // Now we need to find the on the blockchain
      setIsSearching(true);

      getInterestDEXViewERC20Metadata(chainId, parsedDebouncedSearch)
        .then(({ name, decimals, symbol }) => {
          const data = {
            decimals: decimals.toNumber(),
            name,
            symbol,
            address: parsedDebouncedSearch,
          };
          setSearchedToken(data);
          handleTokensAddedByUser(tokensAddedByUser.concat(data));
        })
        .catch(() => setSearchedToken(null))
        .finally(() => setIsSearching(false));
    }
  }, [debouncedSearch, tokensAddedByUser, tokenMetaDataArray, chainId]);

  const removeUserToken = (x: string) =>
    handleTokensAddedByUser(
      tokensAddedByUser.filter(({ address }) => !isSameAddress(address, x))
    );

  return (
    <Modal
      modalProps={{
        isOpen: isModalOpen,
        shouldCloseOnEsc: true,
        onRequestClose: toggleModal,
      }}
      background="#0004"
    >
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" textAlign="right" justifyContent="flex-end" mb="M">
          <Button
            px="L"
            variant="primary"
            onClick={toggleModal}
            hover={{
              bg: 'accentActive',
            }}
          >
            <TimesSVG width="1rem" />
          </Button>
        </Box>
      </Box>
      <Box bg="foreground" p="L" borderRadius="M" maxWidth="27rem">
        {Input}
        {isSearching && <LineLoaderSVG width="100%" />}
        <Box mt="M" display="flex" flexWrap="wrap" justifyContent="flex-start">
          {renderData(
            [
              {
                name: nativeToken.name,
                symbol: nativeToken.symbol as TOKEN_SYMBOL,
                address: ZERO_ADDRESS,
                decimals: nativeToken.decimals,
                chainId: chainId,
              },
              ...SWAP_BASES[chainId],
            ] as ReadonlyArray<SwapTokenModalMetadata>,
            onSelectCurrency,
            false,
            currentToken
          )}
        </Box>
        {debouncedSearch ? (
          <Box my="L" textAlign="center">
            {isSearching ? (
              <Typography variant="normal" color="text">
                Loading...
              </Typography>
            ) : searchedToken ? (
              renderData(
                [searchedToken],
                onSelectCurrency,
                showLocal,
                currentToken
              )
            ) : (
              <Typography variant="normal" color="text">
                Token not found
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <Box mt="L" display="flex" justifyContent="center">
              <Switch
                thin
                defaultValue={showLocal ? 'local' : 'recommended'}
                options={[
                  {
                    value: 'recommended',
                    displayValue: 'Recommended',
                    onSelect: () => setShowLocal(false),
                  },
                  {
                    value: 'local',
                    displayValue: 'Added by me',
                    onSelect: () => setShowLocal(true),
                  },
                ]}
              />
            </Box>
            <Box
              mt="M"
              display="grid"
              overflowY="auto"
              gridGap="0.3rem"
              maxHeight="20rem"
            >
              {renderData(
                (showLocal ? tokensAddedByUser : tokenMetaDataArray).filter(
                  ({ address }) =>
                    !isSameAddress(currentToken, address) &&
                    !SWAP_BASES[chainId].map(prop('address')).includes(address)
                ) as ReadonlyArray<SwapTokenModalMetadata>,
                onSelectCurrency,
                showLocal,
                currentToken,
                removeUserToken
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SwapCurrencyDropdown;
