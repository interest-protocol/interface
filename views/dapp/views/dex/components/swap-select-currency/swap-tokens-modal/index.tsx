import { isAddress } from 'ethers/lib/utils';
import { prop } from 'ramda';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Switch } from '@/components';
import {
  ERC_20_DATA,
  NATIVE_TOKENS,
  SWAP_BASES,
  TOKEN_META_DATA_ARRAY,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Modal, Typography } from '@/elements';
import { useDebounce, useIdAccount } from '@/hooks';
import { useLocalStorage } from '@/hooks';
import { ZERO_ADDRESS } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG, LineLoaderSVG, TimesSVG } from '@/svg';
import { isSameAddress, isZeroAddress, safeGetAddress } from '@/utils';

import {
  SwapCurrencyDropdownProps,
  SwapTokenModalMetadata,
} from '../../../dex.types';
import { OnSelectCurrencyData } from '../../../swap/swap.types';

const renderData = (
  tokens: ReadonlyArray<SwapTokenModalMetadata>,
  onSelectCurrency: (data: OnSelectCurrencyData) => void,
  isLocal: boolean,
  currentToken: string
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens
    ? tokens.map(({ address, symbol, decimals }) => {
        const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;
        const isDisabled = isSameAddress(address, currentToken);
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
              <SVG width="1rem" height="1rem" />
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
                }}
              >
                <TimesSVG width="1rem" />
              </Box>
            )}
          </Box>
        );
      })
    : [];
};

const SwapCurrencyDropdown: FC<SwapCurrencyDropdownProps> = ({
  Input,
  control,
  disabled,
  isSearching,
  toggleModal,
  isOpenModal,
  currentToken,
  setIsSearching,
  onSelectCurrency,
}) => {
  const { chainId } = useIdAccount();
  const [showLocal, setShowLocal] = useState(false);
  const search = useWatch({ control, name: 'search' });
  const [searchedToken, setSearchedToken] =
    useState<null | SwapTokenModalMetadata>(null);
  const [tokensAddedByUser, addTokenAddedByUser] = useLocalStorage<
    ReadonlyArray<SwapTokenModalMetadata>
  >(`${chainId}-interest-dex-custom-tokens`, []);

  const nativeToken = NATIVE_TOKENS[chainId];
  const symbol = isZeroAddress(currentToken)
    ? nativeToken.symbol
    : ERC_20_DATA[chainId][safeGetAddress(currentToken)]?.symbol;

  const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  const debouncedSearch = useDebounce(search, 800);

  const tokenMedataArray = TOKEN_META_DATA_ARRAY[chainId];

  // is searching debounce
  useEffect(() => {
    if (isSearching || !debouncedSearch) return;
    const parsedDebouncedSearch = debouncedSearch.trim().toLowerCase();
    if (!isAddress(parsedDebouncedSearch)) {
      const token = tokensAddedByUser
        .concat(tokenMedataArray)
        .find(
          ({ symbol, name }) =>
            symbol.toLowerCase().startsWith(parsedDebouncedSearch) ||
            name.toLowerCase().startsWith(parsedDebouncedSearch) ||
            name.toLowerCase().includes(parsedDebouncedSearch) ||
            symbol.toLowerCase().includes(parsedDebouncedSearch)
        );

      setSearchedToken(token ? token : null);
    }

    if (isAddress(parsedDebouncedSearch)) {
    }
  }, [debouncedSearch, tokensAddedByUser, tokenMedataArray]);

  return (
    <>
      <Box
        mx="M"
        px="M"
        py="S"
        display="flex"
        borderRadius="M"
        cursor="pointer"
        alignItems="center"
        bg="bottomBackground"
        justifyContent="space-between"
        onClick={disabled ? undefined : toggleModal}
        filter={disabled ? 'grayscale(1)' : 'unset'}
      >
        <Box my="M" display="flex" alignItems="center">
          <>
            <SVG width="1rem" height="1rem" />
            <Typography
              mx="M"
              as="span"
              variant="normal"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              {symbol?.toUpperCase()}
            </Typography>
          </>
        </Box>
        <ArrowSVG width="0.5rem" />
      </Box>
      <Modal
        modalProps={{
          isOpen: isOpenModal,
          shouldCloseOnEsc: true,
          onRequestClose: toggleModal,
          shouldCloseOnOverlayClick: true,
        }}
        background="#0004"
      >
        <Box bg="foreground" p="L" borderRadius="M" maxWidth="27rem">
          {Input}
          {isSearching && <LineLoaderSVG width="100%" />}
          <Box
            mt="M"
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
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
            searchedToken ? (
              renderData(
                [searchedToken],
                onSelectCurrency,
                showLocal,
                currentToken
              )
            ) : (
              'Token not found'
            )
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
                  (showLocal ? tokensAddedByUser : tokenMedataArray).filter(
                    ({ address }) =>
                      !isSameAddress(currentToken, address) &&
                      !SWAP_BASES[chainId]
                        .map(prop('address'))
                        .includes(address)
                  ) as ReadonlyArray<SwapTokenModalMetadata>,
                  onSelectCurrency,
                  showLocal,
                  currentToken
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SwapCurrencyDropdown;
