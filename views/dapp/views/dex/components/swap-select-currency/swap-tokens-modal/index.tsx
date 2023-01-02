import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { Switch } from '@/components';
import { Box, Button, Modal, Typography } from '@/elements';
import { LineLoaderSVG, TimesSVG } from '@/svg';
import { capitalize } from '@/utils';

import { SwapCurrencyDropdownProps } from '../../../dex.types';

/* const renderData = (
  tokens: ReadonlyArray<SwapTokenModalMetadata>,
  onSelectCurrency: (data: OnSelectCurrencyData) => void,
  isLocal: boolean,
  currentToken: string,
  chainId: number,
  removeUserToken: (address: string) => void = noop
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[chainId].default;

  return tokens.map(({ address, symbol, decimals }) => {
    const SVG = TOKENS_SVG_MAP[chainId][address] ?? DefaultTokenSVG;

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
        borderRadius="2.5rem"
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
            <SVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
            <TimesSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
        )}
      </Box>
    );
  });
};
 */
const SwapCurrencyDropdown: FC<SwapCurrencyDropdownProps> = ({
  Input,
  control,
  isSearching,
  toggleModal,
  isModalOpen,
}) => {
  const t = useTranslations();
  const [showLocal, setShowLocal] = useState(false);
  const search = useWatch({ control, name: 'search' });

  const [debouncedSearch] = useDebounce(search, 800);

  // is searching debounce
  useEffect(() => {
    /* 
    if (isSearching || !debouncedSearch) return;
    const parsedDebouncedSearch = debouncedSearch.trim().toLowerCase();
    if (!isAddress(parsedDebouncedSearch)) {
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
    } */
  }, [debouncedSearch]);

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
              color: 'disabled',
            }}
            color="text"
          >
            <TimesSVG width="1rem" maxHeight="1rem" maxWidth="1rem" />
          </Button>
        </Box>
      </Box>
      <Box bg="foreground" p="L" borderRadius="M" maxWidth="27rem">
        {Input}
        {isSearching && <LineLoaderSVG width="100%" />}
        <Box mt="M" display="flex" flexWrap="wrap" justifyContent="flex-start">
          {/*renderData(
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
            currentToken,
            chainId
          )*/}
        </Box>
        {debouncedSearch ? (
          <Box my="L" textAlign="center">
            {isSearching ? (
              <Typography variant="normal" color="text">
                {capitalize(t('common.load', { isLoading: 1 }))}
              </Typography>
            ) : (
              /*  searchedToken ? (
              renderData(
                [searchedToken],
                onSelectCurrency,
                showLocal,
                currentToken,
                chainId
              ) 
              '1'
            ) : */ <Typography variant="normal" color="text">
                {capitalize(t('common.notFound'))}
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
                    displayValue: t('dexPoolFind.switchOption1'),
                    onSelect: () => setShowLocal(false),
                  },
                  {
                    value: 'local',
                    displayValue: t('dexPoolFind.switchOption2'),
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
              {/* renderData(
                (showLocal ? tokensAddedByUser : tokenMetaDataArray).filter(
                  ({ address }) =>
                    !isSameAddress(currentToken, address) &&
                    !SWAP_BASES[chainId].map(prop('address')).includes(address)
                ) as ReadonlyArray<SwapTokenModalMetadata>,
                onSelectCurrency,
                showLocal,
                currentToken,
                chainId,
                removeUserToken
              ) */}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SwapCurrencyDropdown;
