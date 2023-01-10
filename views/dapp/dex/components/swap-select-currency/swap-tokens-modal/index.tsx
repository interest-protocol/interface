import { useTranslations } from 'next-intl';
import { FC, ReactNode, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { v4 } from 'uuid';

import { DEX_TOKENS_DATA, TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { LineLoaderSVG, TimesSVG } from '@/svg';
import { capitalize } from '@/utils';

import {
  SwapCurrencyDropdownProps,
  SwapTokenModalMetadata,
} from '../../../dex.types';
import { OnSelectCurrencyData } from '../../../swap/swap.types';

const renderData = (
  tokens: ReadonlyArray<SwapTokenModalMetadata>,
  onSelectCurrency: (data: OnSelectCurrencyData) => void,
  currentToken: string
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP.default;

  return tokens.map(({ type, symbol, decimals }) => {
    const SVG = TOKENS_SVG_MAP[type] ?? DefaultTokenSVG;

    const isDisabled = type == currentToken;
    const handleSelectCurrency = () =>
      isDisabled ? {} : onSelectCurrency({ type, symbol, decimals });

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
  onSelectCurrency,
}) => {
  const t = useTranslations();
  const search = useWatch({ control, name: 'search' });
  const [searchedToken] = useState<null | SwapTokenModalMetadata>(null);

  const [debouncedSearch] = useDebounce(search, 800);

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
            <TimesSVG width="1rem" maxHeight="1rem" maxWidth="1rem" />
          </Button>
        </Box>
      </Box>
      <Box bg="foreground" p="L" borderRadius="M" maxWidth="27rem">
        {Input}
        {isSearching && <LineLoaderSVG width="100%" />}
        {debouncedSearch ? (
          <Box my="L" textAlign="center">
            {isSearching ? (
              <Typography variant="normal" color="text">
                {capitalize(t('common.load', { isLoading: 1 }))}
              </Typography>
            ) : searchedToken ? (
              renderData([searchedToken], onSelectCurrency, currentToken)
            ) : (
              <Typography variant="normal" color="text">
                {capitalize(t('common.notFound'))}
              </Typography>
            )}
          </Box>
        ) : (
          <Box
            mt="M"
            display="grid"
            overflowY="auto"
            gridGap="0.3rem"
            maxHeight="20rem"
          >
            {renderData(
              DEX_TOKENS_DATA as ReadonlyArray<SwapTokenModalMetadata>,
              onSelectCurrency,
              currentToken
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SwapCurrencyDropdown;
