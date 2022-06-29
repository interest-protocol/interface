import { find, propEq, propOr } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { MAIL_FAUCET_TOKENS, TOKENS_SVG_MAP } from '@/constants';
import { Box, Modal, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { IToken, SwapCurrencyDropdownProps } from '../dex.types';

const BLOCKCHAIN_DATA = [
  {
    name: 'Interest Protocol',
    symbol: 'INT',
    address: '0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C',
  },
  {
    name: 'Binance Main Net',
    symbol: 'BNB',
    address:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
  },
];

const renderData = (
  tokens: ReadonlyArray<IToken>,
  onSelectCurrency: (symbol: string) => void
): ReadonlyArray<ReactNode> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens
    ? tokens.map(({ address, symbol }) => {
        const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;

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
            onClick={() => onSelectCurrency(address)}
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
          </Box>
        );
      })
    : [];
};

const SwapCurrencyDropdown: FC<SwapCurrencyDropdownProps> = ({
  Input,
  tokens,
  control,
  defaultValue,
  onSelectCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const search = useWatch({ control, name: 'search' });

  const toggleOpen = () => setIsOpen(!isOpen);

  const searchResult = useMemo(
    // Change to blockchain search
    () => BLOCKCHAIN_DATA.filter(({ address }) => search === address),
    [search]
  );

  const symbol = propOr(
    '',
    'symbol',
    find(propEq('address', defaultValue), MAIL_FAUCET_TOKENS[4])
  ) as string;

  const SVG = TOKENS_SVG_MAP[symbol || TOKEN_SYMBOL.Unknown];

  return (
    <>
      <Box
        mx="M"
        px="M"
        py="S"
        width="7.6rem"
        display="flex"
        borderRadius="M"
        alignItems="center"
        bg="bottomBackground"
        justifyContent="space-between"
        onClick={toggleOpen}
      >
        <Box my="M" display="flex" alignItems="center">
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
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            {renderData(
              searchResult?.length ? searchResult : tokens,
              onSelectCurrency
            )}
          </Box>
          <Typography
            mt="L"
            fontSize="S"
            variant="normal"
            color="textSecondary"
            textTransform="uppercase"
          >
            More Tokens
          </Typography>
          <Box
            mt="M"
            display="grid"
            overflowY="auto"
            gridGap="0.3rem"
            maxHeight="20rem"
          >
            {renderData(
              searchResult?.length ? searchResult : tokens,
              onSelectCurrency
            )}
          </Box>
          <Box></Box>
        </Box>
      </Modal>
    </>
  );
};

export default SwapCurrencyDropdown;
