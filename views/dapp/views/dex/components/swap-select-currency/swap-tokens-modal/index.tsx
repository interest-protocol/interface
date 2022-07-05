import { FC, ReactNode, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  ERC_20_DATA,
  NATIVE_TOKENS,
  TOKEN_META_DATA_ARRAY,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Modal, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { useLocalStorage } from '@/hooks';
import { ZERO_ADDRESS } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG, TimesSVG } from '@/svg';
import { isSameAddress, isZeroAddress, safeGetAddress } from '@/utils';

import {
  SwapCurrencyDropdownProps,
  SwapTokenModalMetadata,
} from '../../../dex.types';

const renderData = (
  tokens: ReadonlyArray<SwapTokenModalMetadata>,
  onSelectCurrency: (symbol: string) => void,
  isLocal: boolean
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens
    ? tokens.map(({ address, symbol }) => {
        const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;
        const handleSelectCurrency = () => onSelectCurrency(address);
        return (
          <Box
            m="XS"
            px="M"
            py="S"
            key={v4()}
            color="text"
            display="flex"
            cursor="pointer"
            borderRadius="M"
            border="1px solid"
            alignItems="center"
            bg="bottomBackground"
            borderColor="transparent"
            justifyContent="space-between"
            onClick={handleSelectCurrency}
            hover={{
              borderColor: 'accent',
            }}
          >
            <Box my="M" display="flex" alignItems="center">
              <SVG width="1rem" height="1rem" />
              <Typography mx="M" as="span" variant="normal">
                {symbol}
              </Typography>
            </Box>
            {isLocal && (
              <Box color="error">
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
  currentToken,
  onSelectCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const search = useWatch({ control, name: 'search' });
  const searchResult: string | any[] | readonly SwapTokenModalMetadata[] = [];
  const { chainId } = useIdAccount();

  const [tokensAddedByUser, addTokenAddedByUser] = useLocalStorage<
    ReadonlyArray<SwapTokenModalMetadata>
  >(`${chainId}-interest-dex-custom-tokens`, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const nativeToken = NATIVE_TOKENS[chainId];

  const symbol = isZeroAddress(currentToken)
    ? nativeToken.symbol
    : ERC_20_DATA[chainId][safeGetAddress(currentToken)].symbol;

  const SVG = TOKENS_SVG_MAP[symbol || TOKEN_SYMBOL.Unknown];

  const recommendedTokens = [];

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
        onClick={toggleOpen}
        bg="bottomBackground"
        justifyContent="space-between"
      >
        <Box my="M" display="flex" alignItems="center">
          {symbol ? (
            <>
              <SVG width="1rem" height="1rem" />
              <Typography
                mx="M"
                as="span"
                variant="normal"
                hover={{ color: 'accent' }}
                active={{ color: 'accentActive' }}
              >
                {symbol}
              </Typography>
            </>
          ) : (
            <Typography mx="M" as="span" variant="normal">
              Choose Token
            </Typography>
          )}
        </Box>
        <ArrowSVG width="0.5rem" />
      </Box>
      <Modal
        modalProps={{
          isOpen,
          shouldCloseOnEsc: true,
          onRequestClose: toggleOpen,
          shouldCloseOnOverlayClick: true,
        }}
        background="#0004"
      >
        <Box bg="foreground" p="L" borderRadius="M" maxWidth="27rem">
          {Input}
          {!tokensAddedByUser.length && (
            <>
              <Typography
                mt="L"
                fontSize="S"
                variant="normal"
                color="textSecondary"
                textTransform="uppercase"
              >
                Added by you
              </Typography>
              <Box
                mt="M"
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                {renderData(tokensAddedByUser, onSelectCurrency, false)}
              </Box>
            </>
          )}
          <Typography
            mt="L"
            fontSize="S"
            variant="normal"
            color="textSecondary"
            textTransform="uppercase"
          >
            Recommended Tokens
          </Typography>
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
                  name: nativeToken.name,
                  symbol: nativeToken.symbol as TOKEN_SYMBOL,
                  address: ZERO_ADDRESS,
                  decimals: nativeToken.decimals,
                  chainId: chainId,
                },
                ...TOKEN_META_DATA_ARRAY[chainId],
              ].filter(
                (x) => !isSameAddress(currentToken, x.address)
              ) as ReadonlyArray<SwapTokenModalMetadata>,
              onSelectCurrency,
              true
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SwapCurrencyDropdown;
