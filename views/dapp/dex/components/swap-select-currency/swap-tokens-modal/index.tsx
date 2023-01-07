import { useTranslations } from 'next-intl';
import { FC, ReactNode, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { v4 } from 'uuid';

import { Switch } from '@/components';
import { Box, Button, Modal, Typography } from '@/elements';
import { AddressZero } from '@/sdk';
import { LineLoaderSVG, TimesSVG, UnknownCoinSVG } from '@/svg';
import { capitalize, noop } from '@/utils';

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
  removeUserToken: (address: string) => void = noop
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = UnknownCoinSVG;

  return tokens.map(({ address, symbol, decimals }) => {
    const SVG = DefaultTokenSVG;

    const isDisabled = false;
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
  const [showLocal, setShowLocal] = useState(false);
  const search = useWatch({ control, name: 'search' });

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
        <Box mt="M" display="flex" flexWrap="wrap" justifyContent="flex-start">
          {renderData(
            [
              {
                name: '???',
                symbol: '???',
                address: AddressZero,
                decimals: 12,
              },
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
                {capitalize(t('common.load', { isLoading: 1 }))}
              </Typography>
            ) : (
              <Typography variant="normal" color="text">
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
                    displayValue: t('common.switchOption1'),
                    onSelect: () => setShowLocal(false),
                  },
                  {
                    value: 'local',
                    displayValue: t('common.switchOption2'),
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
                [
                  {
                    name: '???',
                    symbol: '???',
                    address: AddressZero,
                    decimals: 12,
                  },
                ] as ReadonlyArray<SwapTokenModalMetadata>,
                onSelectCurrency,
                showLocal,
                currentToken
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SwapCurrencyDropdown;
